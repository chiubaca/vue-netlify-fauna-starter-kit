import {Auth} from  '../../helpers/init-auth.js'

function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

/**
 * call external user signup
 * @param {string} - JWT 
 * @return {promise} -  
 */
function invokeSignupFunction (JWT) {
  return new Promise((resolve, reject) => {
    console.log("invoking external signup function")
    // Must provide the user JWT here otherwise we cant update the Netlify user
    // app_metadata properties which is required for storing the users DB token
    fetch(process.env.VUE_APP_NETLIFY_URL + ".netlify/functions/identity-external-signup",
          {
            method: "POST",
            headers: {
              "cache-control": "no-cache",
              Authorization: "Bearer " + JWT,
            }
          })
         .then((resp) => resp.json())
         .then((data) => {
            if (data.code >= 400){
              reject(data.msg)
              console.error(data)
            }
            console.log("external-signup function was called sucessfully, resolving with data", data)
            resolve(data)
         })
         .catch(error => {reject("error invoking signup function directly", error)})
  })      
}

export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      testData: "some test data",
      currentUser:null,
    }
  },
  getters: {

    testData : state => state.testData,

    // When currentUser has data loggedIn will return true
    loggedIn: state => !!state.currentUser, 

    currentUser: state => state.currentUser,

    netlifyUserLoggedIn: () => !!Auth.currentUser(),

    currentNetlifyUser:() => Auth.currentUser()
  
  
  },
  mutations: {
    updateTestData(state, value) {
      state.testData = value
    },
    SET_GOTRUE(state, value){
      Auth = value
    },
    SET_CURRENT_USER(state, value) {
      state.currentUser = value;
      saveState("auth.currentUser", value)
    }

  },
  actions: {
        
    updateTestDataAction({ commit }, value) {
      commit('updateTestData', value)
    },

     updateAuth({ commit }, value) {
      commit('updateTestData', value)
    },
    
    attemptLogin({ commit }, credentials) {
      console.log(`attempting login for ${credentials.email}`)

      return new Promise((resolve, reject) => {
        Auth
          .login(credentials.email, credentials.password)
          .then(response => {
            resolve(response)
            commit("SET_CURRENT_USER", response)
          })
          .catch(error => {
            console.log("An error occurred trying to signup", error)
            reject(error)
          })
      })
    },

    attemptExternalLogin(){
      console.log("login with external")
      console.log( Auth.loginExternalUrl("Google"))
      window.location.href = Auth.loginExternalUrl("Google");
    },

    // This currently getting called in src\helpers\authorise-tokens.js
    completeExternalLogin({commit}, params){
      return new Promise((resolve, reject)=>{
        console.log("JWT token" , params.access_token)
        // If a user already exists, this will return the existing user and not
        // create a new one
        Auth.createUser(params)
          .then((user) => {
            console.log("completed external login, user object: " , user)
            console.log("user id ",user.id) // eg 5549d142-2059-4902-8ab6-22cd0e0be1bd
            console.log("user meta ", user.user_metadata)
            console.log("JWT  ", params.access_token)

            //If db token is present here, theres no need to call the external signup so exit early
            if(user.app_metadata.db_token){
              console.log("no need to call external signup got db token, ", user)
              commit("SET_CURRENT_USER", user)
              resolve("sign in successfully")
              return
            }

            invokeSignupFunction(params.access_token)
              .then(resp => {
                console.log("setting current user to state, ", resp)
                commit("SET_CURRENT_USER", resp)
                resolve("sign in successfully")
              })
              .catch(error => {
                console.error("problem with external signup function", error)
                reject(error)
              })
          })
          .catch(error => {console.error("problem with external login", error)})
        })
    },
    
    attemptSignup(store , credentials) {
      console.log(`attempting signup for ${credentials.email}...`, credentials)
      return new Promise((resolve, reject) => {
        Auth.signup(credentials.email, credentials.password, { full_name: credentials.name })
          .then(response => {
            console.log(`Confirmation email sent`, response)
            resolve(response)
          })
          .catch(error => {
            console.log("An error occurred trying to signup", error)
            reject(error)
          })
      })
    },
    
    attemptConfirmation(store , token) {
      console.log("Attempting trying to verify token" , token)
      return new Promise((resolve, reject) => {
        Auth
          .confirm(token)
          .then(response => {
            console.log("User has been confirmed")
            resolve(response)
          })
          .catch(error => {
            console.log("An error occurred trying to confirm the user", error)
            reject(error)
          })
      })
    },

    attemptLogout({commit,}){
      commit("SET_CURRENT_USER", null)
      Auth
        .currentUser()
        .logout()
        .then(() => {
          console.log("User logged out")
          alert("you have logged out")
          })
        .catch(error => {
          console.warn("could not log out", error)
          throw error
        })
    },

    getUserJWTToken({getters}){
      console.log(getters.currentNetlifyUser)
      if(!getters.currentNetlifyUser){
        alert("Please sign in again")
        console.warn("User needs to sign in again")
        return
      }
      Auth.currentUser().jwt().then((token) => {
        console.log("got user token: ",token)
      })
    },

    getCurrentUser(){
      console.log("User Object",Auth.currentUser())
    }
  }
}