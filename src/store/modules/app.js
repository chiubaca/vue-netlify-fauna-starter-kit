export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      isDevEnvironment: false,
      siteURL: null
    };
  },

  getters: {
    isDevEnvironment: state => state.isDevEnvironment,
    siteURL: state => state.siteURL
  },

  mutations: {
    SET_DEV_ENV(state, value) {
      state.isDevEnvironment = value;
    },
    SET_SITE_URL(state, value) {
      state.siteURL = value;
    }
  }
};
