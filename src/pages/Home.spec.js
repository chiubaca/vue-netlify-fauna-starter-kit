import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Home from "./Home.vue";
import auth from "../store/modules/auth";

const localVue = createLocalVue();

localVue.use(Vuex, VueRouter);

const router = new VueRouter();

describe("Home", () => {
  let actions = {};
  let state = {};
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state,
          actions,
          getters: auth.getters
        }
      }
    });
  });

  it("There is a main element ", async () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      router,
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.contains("main")).toBe(true);
  });
});
