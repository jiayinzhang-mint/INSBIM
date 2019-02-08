const state = {
  block: null,
  storey: null
};
const getters = {
  blockList: state => {
    return state.block;
  },
  storeyList: state => {
    return state.storey;
  }
};
const mutations = {
  updateBlock: (state, block) => {
    state.block = block;
  },
  updateStorey: (state, storey) => {
    state.storey = storey;
  }
};
const actions = {
  async updateBlock(context, blockList) {
    context.commit("updateBlock", blockList);
  },
  async updateStorey(context, storeyList) {
    context.commit("updateStorey", storeyList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
