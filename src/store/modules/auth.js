/**
 * This module is responsible for all state and actions related to the current authenticated user.
 */
import GoTrue from "gotrue-js";

export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      testData: "some test data",
      currentUser:null,
      GoTrueAuth:null
    }
  },
  getters: {
    loggedIn: state => !!state.currentUser, 

    currentUser: state => state.currentUser,

    netlifyUserLoggedIn: state => !!state.GoTrueAuth.currentUser(),

    currentNetlifyUser: state => state.GoTrueAuth.currentUser(),

    GoTrueAuth: state => state.GoTrueAuth
  },
  mutations: {
    SET_GOTRUE(state, value){
      state.GoTrueAuth = value
    },

    SET_CURRENT_USER(state, value) {
      state.currentUser = value;
    }

  },
  actions: {

    /**
    * Calls external signup endpoint for new users logging in via external provider
    * @param {*} store - vuex store object
    * @param {string} JWT - Json web token used for authorisation header
    * @return {promise <object>} -  
    */
    invokeSignupFunction (store , JWT) {
      return new Promise((resolve, reject) => {
        let URL = `https://${document.location.hostname}/.netlify/functions/identity-external-signup`
        console.log("invoking external signup function @", URL)
        // Must provide the user JWT here otherwise we cant update the Netlify user
        // app_metadata properties which is required for storing the users DB token
        fetch(URL ,
              {
                method: "POST",
                headers: {
                  "cache-control": "no-cache",
                  Authorization: "Bearer " + JWT,
                }
              })
            .then(resp => resp.json())
            .then(data => {
                if (data.code >= 400) {
                  reject(data.msg)
                  console.error("There was an error invoking external signup", data)
                }
                resolve(data)
            })
            .catch(error => {reject("error invoking signup function directly", error)})
      })      
    },

    /**
     * Authorise and login users via email
     * @param {*} store - vuex store object
     * @param {object} credentials - object containing email and password
     * @property {string} credentials.email - email of the user eg hello@email.com
     * @property {string} credentials.password - password string
     */
    attemptLogin({ commit, state }, credentials) {
      console.log(`Attempting login for ${credentials.email}`)
      return new Promise((resolve, reject) => {
        state.GoTrueAuth
          .login(credentials.email, credentials.password)
          .then(response => {
            resolve(response)
            commit("SET_CURRENT_USER", response)
          })
          .catch(error => {
            console.log("An error occurred signing up", error)
            reject(error)
          })
      })
    },

    /**
     * Authorise and login user via an external provider. Calling this will open external provider login which will
     * redirect back to the app with JWT in the URL which needs to be decoded.
     * @param {*} store - vuex store object
     * @param {string} provider - eg "Google", "GitHub", "GitLab"
     */
    attemptExternalLogin({state}, provider){
      window.location.href = state.GoTrueAuth.loginExternalUrl(provider);
    },

    /**
     * 
     * @param {*} store - vuex store object
     * @param {object} params - object containing JWT and other meta data to create/login a user via external provider
     * @property {string} params.access_token - JWT
     * @property {number} params.expires_at eg. 1577573493000
     * @property {string} params.expires_in eg. "3600"
     * @property {string} params.refresh_token eg. "UXarIArZKDt3j-5KyltLJw"
     * @property {string} params.token_type: eg. "bearer"
     */   
    completeExternalLogin({commit, dispatch, state}, params){
    // This currently getting called in src\helpers\authorise-tokens.js
      return new Promise((resolve, reject)=>{
        // If a user already exists, this will return the existing user and not create a new one
        state.GoTrueAuth.createUser(params)
          .then((user) => {
            console.log("Completed external login for user ID " , user.id)
            //If db token is present here, theres no need to call the external signup so exit early
            if(user.app_metadata.db_token){
              console.log("A db token has already been intialised for this userID ", user.id)
              commit("SET_CURRENT_USER", user)
              resolve("Signed in successfully")
              return
            }

            dispatch("invokeSignupFunction", params.access_token)
              .then(resp => {
                commit("SET_CURRENT_USER", resp)
                resolve("Signed in successfully")
              })
              .catch(error => { reject(error) })
          })
          .catch(error => {console.error("Problem with external login", error)})
        })
    },
    
    /**
     * 
     * @param {*} store - vuex store object
     * @param {object} credentials - object containing email and password
     * @property {string} credentials.email - email of the user eg hello@email.com
     * @property {string} credentials.password - password string
     */
    attemptSignup({state} , credentials) {
      console.log(`Attempting signup for ${credentials.email}...`, credentials)
      return new Promise((resolve, reject) => {
        state.GoTrueAuth.signup(credentials.email, credentials.password, { full_name: credentials.name })
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
    
    /**
     * This confirms a new user from an email signup by parsing the token which has been extracted from the Netlify
     * confirmation email.
     * @param {*} store - vuex store object 
     * @param {string} token - token from confimration email eg. "BFX7olHxIwThlfjLGGfaCA"
     */
    attemptConfirmation({state} , token) {
      console.log("Attempting to verify token" , token)
      return new Promise((resolve, reject) => {
        state.GoTrueAuth
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

    /**
     * Sign out the current user if they are logged in.
     * TODO: Promisify this, and remove alert out. follow up UI changes should be handled outside of vuex
     * @param {*} store - vuex store object  
     */
    attemptLogout({state ,commit}){
      commit("SET_CURRENT_USER", null)
      state.GoTrueAuth
        .currentUser()
        .logout()
        .then(() => {
          console.log("User logged out")
          alert("you have logged out")
          })
        .catch(error => {console.error("Could not log user out", error)})
    },

    /**
     *not required, delete at some point
     * @param {*} store - vuex store object  
     */
    getUserJWTToken({getters, state}){
      console.log(getters.currentNetlifyUser)
      if(!getters.currentNetlifyUser){
        alert("Please sign in again")
        console.warn("User needs to sign in again")
        return
      }
      state.GoTrueAuth.currentUser().jwt().then((token) => {
        alert("got user token: ",token)
      })
    },

    /**
     * This should be deleted at some point
     */
    getCurrentUser({state}){
      console.log("User Object", state.GoTrueAuth.currentUser())
    },

    /**
     * Initialises a GoTrue instance. This method also checks if user is in a local environment  based on the URL.
     * this updates the `app/SET_DEV_ENV` flag. This facilitates a zero-config setup as a developer can input their 
     * netlify URL in the UI (see the the `SetNetlifyURL.vue` component). Inspired from the official Netlify 
     * Identity widget.
     * @param {*} store - vuex store object  
     */
    initAuth({commit, rootGetters}){
      console.log("Hello from vuex init Auth")
      // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp/57421931#57421931
      const IPv4Pattern = /\b((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b/;
      const hostName = document.location.hostname
      const APIUrl = `https://${hostName}/.netlify/identity`
    
      if(hostName.match(IPv4Pattern) || hostName ==="localhost"){
        console.log("Looks like your in a dev environment", hostName)
        commit("app/SET_DEV_ENV", true , {root : true})
        console.log("initialising Go True client with", rootGetters["app/siteURL"])
        let Auth = new GoTrue({
              APIUrl: `https://${rootGetters["app/siteURL"]}/.netlify/identity`,
              audience: "",
              setCookie: false
            })

        commit("SET_GOTRUE", Auth)
      
        this.subscribe((mutation) => {
          if (mutation.type === "app/SET_SITE_URL"){
            console.log("re-initialising Go True client with", rootGetters["app/siteURL"])
            let Auth = new GoTrue({
              APIUrl: `https://${rootGetters["app/siteURL"]}/.netlify/identity`,
              audience: "",
              setCookie: false
            })   
          commit("SET_GOTRUE", Auth)
          }
        })

        return
      }

      console.log("Initialising Go True client with ", APIUrl)
      let Auth = new GoTrue({
        APIUrl: APIUrl,
        audience: "",
        setCookie: false
      })

    commit("SET_GOTRUE", Auth) 
    }

  }
}