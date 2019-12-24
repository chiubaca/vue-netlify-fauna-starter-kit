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
 * Update the app_metadata for a netlify user to include add the faunaDB token
 * 
 * @param {object} appMetaDataObject - object containing any additional arbitary data for the user
 * @param {string} usersAdminUrl -  url of  eg "<SITE.com>/.netlify/identity/admin/users/123-abc-456"
 * @param {string} adminAuthHeader - authorisation JWT
 */
function updateNetlifyUserAppMetaData (appMetaData, usersAdminUrl, JWT){
  
  return fetch(usersAdminUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({app_metadata: appMetaData})
    })
    .then(response => response.json())
    .then(data =>  data )
    .catch(e => { console.error("error authorising user", e) });
}

function handler(event, context, callback) {

  const { identity, user } = context.clientContext;

  // Guard if endpoint is hit and user has not provided a valid user
  // JWT in the authorisation header. context.user object will be null
  if (!user) {
      return callback(null, {
      statusCode: 401,
      body: "You should'nt be here"
      });
  }

  const userID = user.sub
  const JWT = identity.token;
  const usersAdminUrl = `${identity.url}/admin/users/${userID}`;
  const userObject = {
    id : userID,
    user_metadata: user.user_metadata
  }
  const password = generator.generate({
  length: 10,
  numbers: true
  });

  console.log("admin url check", usersAdminUrl)
  console.log("bearer token check", JWT)

  createDbUser(userObject, password)
    .then((user) => obtainToken(user, password))
    .then((key) => updateNetlifyUserAppMetaData({db_token : key.secret} , usersAdminUrl, JWT))
    .then((resp) => {
      console.log("Received response: ", !!resp)
      console.log("Updated the user", resp.id );
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