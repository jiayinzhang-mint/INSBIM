const state = {
  resource: null
};
const getters = {};
const mutations = {
  updateResource: (state, resource) => {
    state.resource = resource;
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
