import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import store from './store'
import attemptToAuthoriseNewUser from './helpers/attempt-to-authorise-new-user.js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  store
})


attemptToAuthoriseNewUser()