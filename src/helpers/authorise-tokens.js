/*
Extract and validate tokens in the URL if they are present.
*/ 

import store from '../store'

function checkConfirmationToken(){

  let token = decodeURIComponent(window.location.search)
    .substring(1)
    .split("confirmation_token=")[1];
 
  // Authorise if a token is available, otherwise exit early
  if (token) {
    console.log("got a token: ", token)
    store.dispatch("auth/attemptConfirmation", token)
      .then((resp) => {
        alert(`${resp.email} has been confirmed, please login`);
      })
      .catch(error => {
        alert(`Can't authorise your account right now. Please try again`)
        console.error(error, "Somethings gone wrong logging in")
      });
    return
  }
}

function checkAccessToken(){
  const externalToken = /access_token=/;
  
  // Clean the URL
  const hash = (document.location.hash || "").replace(/^#\/?/, "");
  
  if (hash.match(externalToken)){
    console.log("detected external token", hash.match(externalToken) )
    //create token param from url hash
    const params = {};

    hash.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      params[key] = value;
    });

    store.dispatch("auth/completeExternalLogin", params)
      .then(() => {alert("You have successfully signed in via external provider")})
      .catch(error => {
        alert(`Can't Authorise your account right now, try again`)
        console.error(error, "Somethings gone wrong logging in")
      });
  }
}

export default function () {
  
  checkConfirmationToken();
  checkAccessToken();
}