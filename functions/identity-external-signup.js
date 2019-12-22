/*
Generates a new account in faunaDB based on the unique user ID 
along with some supplementry user_metadata

This function will only work if invoked with a POST request along with
an Authorisation header that has a valid JWT
*/

"use strict";
const fetch = require("node-fetch");
const faunadb = require("faunadb");
const generator = require('generate-password');

/* configure faunaDB Client with our secret 
   DB Secret key is held within the netlify online UI
*/
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/* create a user in FaunaDB that can connect from the browser */
/**
 * 
 * @param {object} userData
 * @property {string} userData.id - netlify id nunmber
 * @property {object} userData.user_metadata - additonal arbitary 
 * @param {string} password 
 */ 
function createDbUser(userData, password) {
  return client.query(q.Create(q.Collection("users"), {
    credentials : {
      password : password
    },
    data : {
      id : userData.id,
      user_metadata : userData.user_metadata
    }
  }))
}

function obtainToken(user, password) {
  return client.query(
    q.Login(q.Select("ref", user), { password }))
}

/**
 * Update the app_metadata for a netlfy user to include add the faunaDB token
 * TODO: This could be a much more generic function to allow for any arbitary
 *       data to be written to user account. Current it is very tightly coupled
 *       to the obtainToken meth
 * 
 * @param {object} key - object from obtain token
 * @param {string} usersUrl -  url of  eg "<SITE.com>/.netlify/identity/admin/users/123-abc-456"
 * @param {string} adminAuthHeader - authorisation JWT
 */
function updateNetlifyUser (key, usersUrl, JWT){

  try {
    return fetch(usersUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${JWT}` },
      body: JSON.stringify({
        app_metadata: {
          faunadb_token : key.secret
          } 
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Updated the user", data.id );
        return data ;
      })
      .catch(e => { console.error("error authorising user", e) });
  } 
  catch (e) {
      console.error("error trying to update netlify user", e)
      return e;
  }
}

function handler(event, context, callback) {

  const { identity, user } = context.clientContext;

  // Guard if endpoint is hit without correct headers
  if (!user) {
      return callback(null, {
      statusCode: 401,
      body: "You should'nt be here"
      });
  }

  const userID = user.sub
  const JWT = identity.token;
  const usersUrl = `${identity.url}/admin/users/${userID}`;
  const userObject = {
    id : userID,
    user_metadata: user.user_metadata
  }
  const password = generator.generate({
  length: 10,
  numbers: true
  });

  console.log("admin url check", usersUrl)
  console.log("bearer token check", JWT)
  console.log("New user, creating user in DB via external signup")
  console.log(userObject)
  
  
  createDbUser(userObject, password)
    .then((user) => obtainToken(user, password))
    .then((key) => updateNetlifyUser(key, usersUrl, JWT))
    .then((resp) => {
      console.log("Received response: ", !!resp)
      callback(null, {
        statusCode: 200, 
        body: JSON.stringify(resp)
      })
    })
    .catch((error) => {
      console.error("Unable to create a user account", error)
      callback(null, {
        statusCode: 418,
        body: JSON.stringify({
          error: error
        })
      })
    })
}

module.exports = {handler: handler};