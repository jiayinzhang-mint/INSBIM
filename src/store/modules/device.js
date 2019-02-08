const state = {
  device: null
};
const getters = {
  deviceList: state => {
    return state.device;
  }
};
const mutations = {
  updateDevice: (state, device) => {
    state.device = device;
  }
};
const actions = {
  async updateDevice(context, deviceList) {
    context.commit("updateDevice", deviceList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
