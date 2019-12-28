"use strict";
const faunadb = require("faunadb");
const generator = require('generate-password');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/**
 * create a user in FaunaDB that can connect from the browser
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
  console.log("Generating new DB token")
  return client.query(
    q.Login(q.Select("ref", user), { password }))
}

function generatePassword(){
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
    .then((user) => obtainToken(user, password))
    .then((key) => {
      console.log("Successfully created DB account")
      callback(null, {
        //If return status is 200 or 204 the function will get blocked
        statusCode: 200,
        //the return body will update the netlify user   
        body: JSON.stringify({ app_metadata: { db_token : key.secret} })
      })
    })
    .catch((e) => {
      console.error("Somethings gone wrong ",e)
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({error: e})
      })
    })
}

module.exports = {
  handler: handler,
  createDbUser: createDbUser,
  obtainToken: obtainToken,
  generatePassword: generatePassword
};