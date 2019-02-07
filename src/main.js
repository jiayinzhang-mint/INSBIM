import Vue from "vue";
import "./plugins/vuetify";
import App from "./App";
import router from "./router";
import store from "./store/store";
import axios from "axios";

Vue.config.productionTip = false;
axios.interceptors.request.use(config => {
  //设置拦截器
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  config.headers["Authorization"] =
    "INSBIM " + store.getters["user/userInfo"].token;
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
