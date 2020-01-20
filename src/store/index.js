import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import auth from "./modules/auth";
import app from "./modules/app";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  module: ["auth", "app"]
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => ({}),
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    auth,
    app
  },
  plugins: [vuexLocalStorage.plugin]
});

export default store;
