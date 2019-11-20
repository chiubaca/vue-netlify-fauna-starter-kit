export default {
  namespaced: true,

  state() {
    return {
      testData: "test"
    }
  },
  getters: {
    testData: state => state.testData,
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