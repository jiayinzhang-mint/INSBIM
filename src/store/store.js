import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

import user from "./modules/user";
import building from "./modules/building";

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

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({ building: state.building }),
  filter: mutation => mutation.type == "building/updateResource"
});

export default new Vuex.Store({
  modules: {
    user,
    building
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin]
});
