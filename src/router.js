import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Restricted from './components/Restricted.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home
},
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { guest: true }
},
{
  path: '/restricted',
  name: 'restricted',
  component: Restricted,
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router