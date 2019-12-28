/*
helper file to validate tokens in the URL if they are present 
*/ 

import store from '../store'

export default function () {
  
  // hash from URL
  const hash = (document.location.hash || "").replace(/^#\/?/, "");
  
  let token = decodeURIComponent(window.location.search)
    .substring(1)
    .split("confirmation_token=")[1];

  //regex to check for external access token url hash
 
  // let jwt = window.location.hash.match(/access_token=/)
  
  // only authorise if a token is available
  if (token) {
    console.log("got a token: ", token)
    store.dispatch("auth/attemptConfirmation", token)
      .then((resp) => {
        alert(`Your account has been confirmed, please login`);
        console.log(resp)
      })
      .catch(error => {
        alert(`Can't Authorise your account right now, try again`)
        console.error(error, "Somethings gone wrong logging in")
      });
    return
  }
  
  const externalToken = /access_token=/;
  if (hash.match(externalToken)){
    console.log("detected external token", hash.match(externalToken) )
    //create token param from url hash
    const params = {};
    hash.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      params[key] = value;
    });
    //could store this param as login cookie here...

    store.dispatch("auth/completeExternalLogin", params)
    .then(() => {
        alert("You have successfully signed in via external provider");
      })
      .catch(error => {
        alert(`Can't Authorise your account right now, try again`)
        console.error(error, "Somethings gone wrong logging in")
      });
  }

  console.log("not a new user")

}