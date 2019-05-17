const state = {
  device: null,
  node_type: [
    { value: "01", label: "水压" },
    {
      value: "02",
      label: "水质",
    },
    {
      value: "03",
      label: "开盖",
    },
  ],
};
const getters = {
  deviceList: state => {
    return state.device;
  },
  nodeType: state => {
    return state.node_type;
  },
};
const mutations = {
  updateDevice: (state, device) => {
    state.device = device;
  },
};
const actions = {
  async updateDevice(context, deviceList) {
    context.commit("updateDevice", deviceList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
