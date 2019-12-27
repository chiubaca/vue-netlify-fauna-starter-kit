import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import store from './store'
import restoreState from "./helpers/restore-state"
import attemptToAuthoriseTokens from "./helpers/authorise-tokens"

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  store,
})

// store.commit("auth/SET_GOTRUE", GoTrueAuth)


restoreState()
attemptToAuthoriseTokens()

Vue.config.productionTip = false