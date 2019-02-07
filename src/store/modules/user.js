const state = {
  userInfo: null
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  }
};
const actions = {
  async login(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
