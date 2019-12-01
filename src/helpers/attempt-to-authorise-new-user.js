import store from '../store'
import netlifyIdentity from "netlify-identity-widget"

export default function () {

  //get the token from the email redirect URL
  let token = decodeURIComponent(window.location.search)
    .substring(1)
    .split("confirmation_token=")[1];

  // This is how you can manually check for a JWT token,
  // It possible to deserialise this and use the data see- https://jwt.io/
  // let jwt = decodeURIComponent(window.location.search)
  //   .substring(1)
  //   .split("access_token=")[1]
  //   .split("&")[0]

  // only authorise if a token is available
  if (token) {
    console.log("got a token: ", token)
    store.dispatch("auth/attemptConfirmation", token)
      .then((resp) => {
        alert(`Your account has been confirmed, please login`);
        netlifyIdentity.open();
        console.log(resp)
      })
      .catch(error => {
        alert(`Can't Authorise your account right now, try again`)
        console.error(error, "Somethings gone wrong logging in")
      });
    return
  }



  console.log("not a new user")

}