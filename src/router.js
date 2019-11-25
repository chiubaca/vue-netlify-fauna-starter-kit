import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Restricted from './components/Restricted.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
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
  path: '/',
  name: 'restricted',
  component: Restricted,
  meta: { authRequired: true }
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//console logs for debugging
let debug = (msg) => console.debug(`Router Debug: ${msg}`)

router.beforeEach((to, from, next) => {
  debug(`Going to ${to.name}, from ${from.name}`)
  debug(`Logged in state is: ${store.getters["auth/loggedIn"]}`)
  
  const authRequired = to.matched.some(route => route.meta.authRequired);
  debug(`This page needs auth ${authRequired}`)
  
  if (!authRequired){
    // check if current user
    debug("no login required, pass through")
    return next();
  } 
    
  if (store.getters["auth/loggedIn"]) {
    // maybe do some validation to check token is valid //
    return next()
  
  }
  
  console.warn("Page restricted, you need to login")
  next({ name: "login", query: { redirectFrom: to.fullPath } });

})



export default router