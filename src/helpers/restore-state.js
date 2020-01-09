/**
 * Restore user from local storage into vuex user store
 */

import store from '../store'

export default function () {
  let savedUser = null;

  try{
    savedUser = JSON.parse(localStorage.getItem("store")) ;
      console.log(`Remembered user account:
               - ${savedUser.currentUser.id}  
               - ${savedUser.currentUser.email}`)

    store.commit("auth/SET_CURRENT_USER", savedUser.currentUser)
  }
  catch{
    // No user in Local storage so exit early
    // if (!savedUser){
    //   return
    // }
    console.log("no saved user")
  }

}