

import netlifyIdentity from "netlify-identity-widget"

let saveState = function (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
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

    currentUser: state => state.currentUser
  
  },
  mutations: {

    SET_CURRENT_USER(state, value) {
      state.currentUser = value;
      saveState("auth.currentUser", value)
    }

  },
  actions: {
    sup() {
      console.log("sup")
    },

    attemptLogout({commit}){
      commit("SET_CURRENT_USER", null)
      netlifyIdentity.logout();
      alert("You've logged out")

    },
   
   updateUserMetaData({state, commit}){
       //TECH DEBT - running this can mutate vuex state directly for some weird reason
       // consider moving this to a server side function            
      netlifyIdentity.gotrue.currentUser()
        .update({
            data: {
              randomData: "hihihi",
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
                            
    }
  }
}