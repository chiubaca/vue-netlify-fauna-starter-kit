import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/journals" },
  {
    path: "/home",
    name: "home",
    component: () => import("./components/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
    meta: { guest: true }
  },
  {
    path: "/journals",
    name: "journals",
    component: () => import("./components/AllJournals.vue"),
    meta: { authRequired: true }
  },
  {
    path: "/journals/:id/posts",
    name: "posts",
    component: () => import("./components/AllPosts.vue"),
    meta: { authRequired: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./components/Profile.vue"),
    meta: { authRequired: true }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired);

  if (!authRequired) {
    // check if current user
    return next();
  }

  if (store.getters["auth/loggedIn"]) {
    // maybe do some validation to check token is valid //
    return next();
  }

  console.warn("Page restricted, you need to login");
  next({ name: "login", query: { redirectFrom: to.fullPath } });
});

export default router;
