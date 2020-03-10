import Vue from "vue";
import AppLayout from "./components/AppLayout.vue";
import router from "./router";
import store from "./store";
import attemptToAuthoriseTokens from "./helpers/authorise-tokens";

new Vue({
  el: "#app",
  render: h => h(AppLayout),
  router,
  store
});

store.dispatch("auth/initAuth");

attemptToAuthoriseTokens();

Vue.config.productionTip = false;

// Register a global custom directive called `v-focus`
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  // eslint-disable-next-line prettier/prettier
  inserted: function (el) {
    // Focus the element
    el.focus();
  }
});
