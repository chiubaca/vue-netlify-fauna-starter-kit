/*
Extract and validate tokens in the URL if they are present.
*/

import store from "../store";

/**
 * Checks the URL for a confirmation token, this is available when the user has successfully signed up via emauik and
 * confirms their email address via the automated email sent by Netlify.
 */
function checkConfirmationToken() {
  let token = decodeURIComponent(window.location.search)
    .substring(1)
    .split("confirmation_token=")[1];
  console.log("Checking for a token..");
  // Authorise if a token is available, otherwise exit early
  if (token) {
    console.log("Found a token: ", token);
    store
      .dispatch("auth/attemptConfirmation", token)
      .then(resp => {
        alert(`${resp.email} has been confirmed, please login`);
      })
      .catch(error => {
        alert(`Can't authorise your account right now. Please try again`);
        console.error(error, "Somethings gone wrong logging in");
      });
    return;
  }
  console.log("no token found");
}

/**
 * Checks the URL for an access_token. This is avaiable when the user is redirected back when they have authenticated
 * via an external provider
 */
function checkAccessToken() {
  const externalToken = /access_token=/;
  console.log("Checking for an external provider token..");
  // Clean the URL
  const hash = (document.location.hash || "").replace(/^#\/?/, "");

  if (hash.match(externalToken)) {
    console.log("Detected external token", hash.match(externalToken));
    //create token param from url hash
    const params = {};

    hash.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      params[key] = value;
    });

    store
      .dispatch("auth/completeExternalLogin", params)
      .then(() => {
        alert("You have successfully signed in via external provider");
      })
      .catch(error => {
        alert(`Can't Authorise your account right now, try again`);
        console.error(error, "Somethings gone wrong logging in");
      });
  }
  console.log("no external provider token found");
}

export default function() {
  checkConfirmationToken();
  checkAccessToken();
}
