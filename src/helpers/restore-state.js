/**
 * Restore user from local storage into vuex
 * Should this logic all be moved into a Vuex action which is initialised on startup? 🤔
 * 

import store from '../store'

function restoreUser(){
  let savedUser = null;

  try{
    savedUser = JSON.parse(localStorage.getItem("store")) ;
      console.log(`Remembered user account:
               - ${savedUser.currentUser.id}  
               - ${savedUser.currentUser.email}`)

    store.commit("auth/SET_CURRENT_USER", savedUser.currentUser)
  }
  catch{
    console.log("no saved user")
  }
}

function restoreDevURL(){
    let netlifyURL = null;

  try{
    netlifyURL = JSON.parse(localStorage.getItem("store")) ;
    store.commit("app/SET_SITE_URL", netlifyURL.siteURL)
  }
  catch{
    console.log("no saved user")
  }
}


export default function () {

  restoreUser()
  restoreDevURL()
}