import store from '../store'

export default function () {

  let savedUser = JSON.parse(localStorage.getItem("store")) ;

  if (!savedUser){
    console.log("No user found in local storage")
    return
  }

  console.log("restoring the following user to app state", savedUser.currentUser)
  store.commit("auth/SET_CURRENT_USER", savedUser.currentUser)
}