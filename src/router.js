import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Restricted from './components/Restricted.vue'
import store from './store'

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
  meta: { authRequired: true }
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired);
  if (!authRequired) return next();
  // check if current user

  if (store.getters["auth/loggedIn"]) {
    // maybe do some validation to check token is valid //
    next()
  }
  
  console.warn("Page restricted, you need to login")
  next({ name: "login", query: { redirectFrom: to.fullPath } });
})


export default router