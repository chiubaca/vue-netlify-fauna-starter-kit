import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import store from './store'
import restoreState from "./helpers/restore-state"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router,
  store
})

restoreState()
