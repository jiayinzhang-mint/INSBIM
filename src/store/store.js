import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

import user from "./modules/user";
import building from "./modules/building";
import device from "./modules/device";

Vue.use(Vuex);

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 3
    }),
  reducer: state => ({ user: state.user }),
  filter: mutation => mutation.type == "user/updateUserInfo"
});

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    building: state.building,
    device: state.device,
    user: state.user
  }),
  filter: mutation =>
    mutation.type == "building/updateBlock" ||
    mutation.type == "building/updateStorey" ||
    mutation.type == "device/updateDevice" ||
    mutation.type == "user/updateUserList"
});

export default new Vuex.Store({
  modules: {
    user,
    building,
    device
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin]
});
