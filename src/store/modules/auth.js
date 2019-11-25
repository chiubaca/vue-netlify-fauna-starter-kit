
import GoTrue from "gotrue-js";

export const auth = new GoTrue({
  APIUrl: "https://simple-vue-netlify-auth.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false
});

let saveState = function (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

export default {
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
    loggedIn: state => !!state.currentUser 
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
    attemptLogin({ commit, dispatch }, credentials) {
      console.log(`attempting login for ${credentials.email}`)

      return new Promise((resolve, reject) => {

        dispatch("attemptConfirmation", credentials)
          .then(() => {
            auth
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

      })

    },
    attemptSignup({ dispatch }, credentials) {
      console.log(`attempting signup for ${credentials.email}...`)
      return new Promise((resolve, reject) => {
        auth.signup(credentials.email, credentials.password)
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
    attemptConfirmation({ dispatch }, credentials) {
      dispatch("sup")

      return new Promise((resolve, reject) => {
        
        //check if there is a redirect token
        if(!credentials.token){
          resolve();
          return
        }
        
        auth
          .confirm(credentials.token)
          .then(response => {
            console.log("User has been confirmed")
            resolve(response)
          })
          .catch(error => {
            console.log("An error occurred trying to confirm the user", error)
            reject(error)
          })
      })
    }

  }
}