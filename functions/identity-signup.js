/*
This is a Netlify serverless function that first generates a new FaunaDB account based on the Netlify unique user ID. 
It will then update the Netlify user_metadata account with the FaunaDB token which is embedded in the user JWT for
future authentication sessions.

This function is triggered on a successfully email signup. This does not get triggered on external signups. Read more 
about event-triggered functions here: https://docs.netlify.com/functions/trigger-on-events/#available-triggers 
*/

"use strict";
const faunadb = require("faunadb");
const generator = require("generate-password");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/**
 * create and store Netlify metadata in a new user FaunaDB record.
 * @param {object} - Netlify userData
 * @property {string} - userData.id - netlify id nunmber
 * @property {object} - userData.user_metadata - additonal arbitary
 * @param {string} - password
 * @return {promise <object>} - FaunaDB response object e.g
 * {
  ref: Ref(Collection("users"), "262617811824673300"), 
  ts: 1586710712280000,
  data: {
    id: 'e362dc96-b891-4c81-9df4-506215498f39',
    user_metadata: { full_name: 'alexchiu.11@gmail.com' }
  }
}
 */

function createDbUser(userData, password) {
  return client.query(
    q.Create(q.Collection("users"), {
      credentials: {
        password: password
      },
      data: {
        id: userData.id,
        user_metadata: userData.user_metadata
      }
    })
  );
}

/**
 * Create a new record in the DB user table.
 * @param {string} - userID
 * @param {string} - password
 * @return {promise <object>} - FaunaDB response object
 */
function obtainToken(user, password) {
  console.log("Generating new DB token");
  return client.query(q.Login(q.Select("ref", user), { password }));
}

/**
 * Wrapper function to return a randomly generated password
 * @return {string} - randomly generated password
 */
function generatePassword() {
  return generator.generate({
    length: 10,
    numbers: true
  });
}

function handler(event, context, callback) {
  let payload = JSON.parse(event.body);
  let userData = payload.user;
  const password = generatePassword();

  createDbUser(userData, password)
    .then(user => obtainToken(user, password))
    .then(key => {
      console.log("Successfully created DB account");
      callback(null, {
        //If return status is 200 or 204 the function will get blocked
        statusCode: 200,
        //the return body will update the netlify user
        body: JSON.stringify({ app_metadata: { db_token: key.secret } })
      });
    })
    .catch(e => {
      console.error("Somethings gone wrong ", e);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: e })
      });
    });
}

module.exports = {
  handler: handler,
  createDbUser: createDbUser,
  obtainToken: obtainToken,
  generatePassword: generatePassword
};
