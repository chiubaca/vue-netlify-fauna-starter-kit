import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import store from './store'
import attemptToAuthoriseTokens from "./helpers/authorise-tokens"
// import {initAuth} from "./helpers/init-auth"

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  store,
})

store.dispatch("auth/initAuth")
// initAuth()
attemptToAuthoriseTokens()

//Redirect to journals if user is already logged in
if(!!store.getters["auth/currentUser"]){
  router.push('journals')
}

Vue.config.productionTip = false