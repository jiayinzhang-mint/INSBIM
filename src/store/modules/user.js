const state = {
  userInfo: null,
  userList: []
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  },
  userList: state => {
    return state.userList;
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  updateUserList: (state, userList) => {
    state.userList = userList;
  }
};
const actions = {
  async login(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  },
  async updateUserList(context, userList) {
    context.commit("updateUserList", userList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
