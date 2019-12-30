/**
 * Restore user from local storage into vuex user store
 */

import store from '../store'

export default function () {
  let savedUser = JSON.parse(localStorage.getItem("store")) ;
  // No user in Local storage so exit early
  if (!savedUser){
    return
  }
  console.log(`Remembered user account:
               - ${savedUser.currentUser.id}  
               - ${savedUser.currentUser.email}`)

  store.commit("auth/SET_CURRENT_USER", savedUser.currentUser)
}