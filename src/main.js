import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router
})
