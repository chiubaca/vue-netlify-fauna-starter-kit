/*
This is a Netlify serverless function which leverages code from identity-signup.js
As external signups are not triggered automatically by Netlify, some additional code is required. The main difference is
that we need to make sure the function handler has an identity context. This is provided by the client calling this 
function imperatively. Without this, the function is unable to update the user app_metadata via the Netlify admin API.
*/

"use strict";
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require("node-fetch");
const identitySignup = require("./identity-signup");

/**
 * Update the app_metadata for a netlify user to include add the faunaDB token
 * @param {object} - appMetaDataObject - object containing any additional arbitrary data for the user
 * @param {string} - usersAdminUrl -  url of  eg "<SITE.com>/.netlify/identity/admin/users/123-abc-456"
 * @param {string} - adminAuthHeader - authorisation JWT
 * @return {promise <object>} - Netlify user
 */
function updateNetlifyUserAppMetaData(appMetaData, usersAdminUrl, JWT) {
  return fetch(usersAdminUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ app_metadata: appMetaData })
  })
    .then(response => response.json())
    .then(data => data)
    .catch(e => {
      console.error("error authorising user", e);
    });
}

function handler(event, context, callback) {
  const { identity, user } = context.clientContext;

  // Guard if endpoint is hit directly and user has not provided a valid user JWT in the authorisation header.
  if (!user) {
    return callback(null, {
      statusCode: 401,
      body: "You shouldn't be here"
    });
  }

  const userID = user.sub;
  const JWT = identity.token;
  const usersAdminUrl = `${identity.url}/admin/users/${userID}`;
  const userObject = {
    id: userID,
    user_metadata: user.user_metadata
  };
  const password = identitySignup.generatePassword();
  console.log("admin url check", usersAdminUrl);
  console.log("bearer token check", JWT);

  identitySignup
    .createDbUser(userObject, password)
    .then(user => identitySignup.obtainToken(user, password))
    .then(key =>
      updateNetlifyUserAppMetaData({ db_token: key.secret }, usersAdminUrl, JWT)
    )
    .then(resp => {
      console.log("Received response: ", !!resp);
      console.log("Updated the user", resp.id);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(resp)
      });
    })
    .catch(error => {
      console.error("Unable to create a user account", error);
      callback(null, {
        statusCode: 418,
        body: JSON.stringify({ error: error })
      });
    });
}

module.exports = { handler: handler };
