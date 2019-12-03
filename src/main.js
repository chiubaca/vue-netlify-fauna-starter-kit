import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import store from './store'
import netlifyIdentity from "netlify-identity-widget"
import restoreState from "./helpers/restore-state"
// import attemptToAuthoriseNewUser from './helpers/attempt-to-authorise-new-user.js'

Vue.config.productionTip = false

console.log("get data from store" , )

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  store
})

if (store.getters["auth/loggedIn"] === false){
  netlifyIdentity.open()
}



// attemptToAuthoriseNewUser()
restoreState()