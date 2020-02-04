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
