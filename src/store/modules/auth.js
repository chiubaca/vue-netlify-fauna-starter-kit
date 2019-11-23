
import GoTrue from "gotrue-js";
    
export const auth = new GoTrue({
  APIUrl: "https://simple-vue-netlify-auth.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false
});

export default {
  namespaced: true,

  state() {
    return {
      testData: "Hello!",
      loggedIn: false
    }
  },
  getters: {
    testData: state => state.testData,
    loggedIn: state => state.loggedIn
  },
  mutations: {
    updateTestData(state, value) {
      state.testData = value
    }
  },
  actions: {
    updateTestDataAction({ commit }, value) {
      commit('updateTestData', value)
    },
    attemptLogin( ){
      console.log("dispatching login mutation..." )

    },
    attemptSignup({ state }, credentials){
       console.log(`attempting signup for ${credentials.name}...`)
       return new Promise((resolve, reject) => {
         auth.signup(credentials.email, credentials.password)
          .then(response => {
            console.log(`${state.testData} Confirmation email sent` , response)
            resolve(response)
          })
          .catch(error => {
            console.log("An error occurred trying to signup", error)
            reject(error)
          })
       })


    }

  }
}