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
 * @param {string} adminAuthHeader - bearer along with JWT to be passed into the 
 *                                   header of the PUT request
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
        return { data };
      })
      .catch(e => { console.error("error authorising user",e) });
  } 
  catch (e) {
      console.error("error trying to update netlify user", e)
      return e;
  }
}

function checkNetlifyUserHasDbToken (usersUrl, JWT){
  console.log("Checking Netlify user account....")
  return new Promise((resolve, reject)=>{
    fetch(usersUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${JWT}` },
    })
    .then(response => response.json())
    .then(data => {
      let dbToken = data.app_metadata.faunadb_token
      console.log("Does user have DB token?", dbToken);
      if(!!dbToken === true){
        resolve(data) 
      }
      else if(!!dbToken === false){
        resolve(false) 
      }
    })
    .catch(e => { 
      console.error("error authorising user",e) 
      reject(e)
      });

  })
} 

function handler(event, context, callback) {

  const { identity, user } = context.clientContext;

  //Guard if user hits this function URL direclty
  console.log("What is the user?", user)

  if (!user) {
      return callback(null, {
      statusCode: 401,
      body: "You should'nt be here"
      });
  }

  // Try-block required as we cant guarantee the event.body can parse correctly
  // if it fails it results in a runtime error.
  try {
    let payload = JSON.parse(event.body);
    console.log("What is the payload?", payload)
    let userData = payload.user;
    const usersUrl = `${identity.url}/admin/users/${userData.id}`;
    const JWT = identity.token;
  
    console.log("admin url check", usersUrl)
    console.log("bearer token check", JWT)

    checkNetlifyUserHasDbToken(usersUrl, JWT)
    .then((resp) => {
      if(!!resp === true){
        //send the callback and end the process 
        console.log("User has DB token present, ending process")
        callback(null, {
          statusCode: 200, 
          body: JSON.stringify(resp)
        })
        return
      } else {
        // As no DB token is present, we can gurantee this is brand new signup
        // therefor go ahead and create the new user in the DB
        console.log("New user, creating user in DB via external signup")
        
        const password = generator.generate({
        length: 10,
        numbers: true
        });
  
        createDbUser(userData, password)
          .then((user) => obtainToken(user, password))
          .then((key) => updateNetlifyUser(key, usersUrl, JWT))
          .then((resp) => {
            console.log("Received response: ", !!resp)
            callback(null, {
              statusCode: 200, 
              body: JSON.stringify(resp.data)
            })
          })
          .catch((error) => {
            console.error("Unable to create a user account", error)
            callback(null, {
              statusCode: 500,
              body: JSON.stringify({
                error: error
              })
            })
          })
      }
    })
  } catch(error) {
    let errorMessage = "Cant process the given payload"
    callback(null, {
        statusCode: 418,
        body: errorMessage
      });
    console.error(errorMessage , error)
    return
  }
}

module.exports = {handler: handler};