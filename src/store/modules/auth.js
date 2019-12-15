
import GoTrue from "gotrue-js";

export const Auth = new GoTrue({
  APIUrl: "https://simple-vue-netlify-auth.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false
});

let saveState = function (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

//hacking around - call a new signup Netlify function after
//external login completes
let invokeSignupFunction = function(userID, userMetaDataObject, JWT){
  let userObject =  { 
        user:{
          id: userID,
          user_metadata: userMetaDataObject
      }
     };

  let data = JSON.stringify(userObject);
  
  // Must provide the user JWT here otherwise we cant update the Netlify user
  // app_metadata properties which is required for storing the users DB token
  fetch("https://simple-vue-netlify-auth.netlify.com/.netlify/functions/identity-external-signup",
        {
          method: "POST",
          body: data,
           headers: {
            "cache-control": "no-cache",
            Authorization: "Bearer " + JWT,
           },
        }
      )
      .then((res) => {console.log("invoked signup function direclty", res)})
      .catch(err => {console.error("error invoking signup function directly", err)})
}

export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      testData: "Hello!",
      currentUser:null
    }
  },
  getters: {
    testData: state => state.testData,
    
    // When currentUser has data loggedIn will return true
    loggedIn: state => !!state.currentUser, 

    currentUser: state => state.currentUser,

    authToken: () => "authToken placeholder"
  
  },
  mutations: {
    updateTestData(state, value) {
      state.testData = value
    },
    SET_CURRENT_USER(state, value) {
      state.currentUser = value;
      saveState("auth.currentUser", value)
    }

  },
  actions: {
    sup() {
      console.log("sup")
    },
    
    updateTestDataAction({ commit }, value) {
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

    completeExternalLogin({commit}, params){
      console.log("JWT token" , params.access_token)
      
      Auth.createUser(params)
        .then(user =>{
          console.log("completed external login, user object: " , user)
          console.log("user id ",user.id)
          console.log("user meta ", user.user_metadata)
          console.log("JWT  ", params.access_token)
          invokeSignupFunction(user.id ,user.user_metadata,params.access_token)
          commit("SET_CURRENT_USER", user)

        })
        .then(user => {console.log("finally so somthing with the user object here...", user)})
        .catch(err => {
          console.log("problem with external login" , err)
        })
       
    },
    
    attemptSignup({ dispatch }, credentials) {
      console.log(`attempting signup for ${credentials.email}...`, credentials)
      return new Promise((resolve, reject) => {
        Auth.signup(credentials.email, credentials.password, { full_name: credentials.name })
          .then(response => {
            dispatch("sup")
            console.log(`Confirmation email sent`, response)
            resolve(response)
          })
          .catch(error => {
            console.log("An error occurred trying to signup", error)
            reject(error)
          })
      })


    },
    
    attemptConfirmation({ dispatch }, token) {
      dispatch("sup")
      console.log("trying to verify token in vuex" , token)
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

    attemptLogout({commit}){
      
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

    updateUserMetaData({state, commit}){
       //TECH DEBT - running this can mutate vuex state directly for some weird reason
       // consider moving this to a server side function            
      Auth.currentUser()
        .update({
            data: {
              app_metadata:{
                dbToken: "hihihi",
              }
            },
        })
        .then((response) => {
          commit("SET_CURRENT_USER", state.currentUser)
          console.log("Updated user")
          console.log(response)

          })
        .catch(error => {
          console.log("Failed to update user: %o", error);

          throw error;
            });
                            
    },

    getUserJWTToken(){
      Auth.currentUser().jwt().then((token) => {
        console.log("got user token: ",token)
      })
    }
  }
}