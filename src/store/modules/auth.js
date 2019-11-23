export default {
  namespaced: true,

  state() {
    return {
      testData: "test",
      loggedIn: false
    }
  },
  getters: {
    testData: state => state.testData,
    loggedIn: state => state.loggedIn
  },
  mutations: {
    updateTestData(state, value) {
      state.testData = value
    }
  },
  actions: {
    updateTestDataAction({ commit }, value) {
      commit('updateTestData', value)
    },

  }
}