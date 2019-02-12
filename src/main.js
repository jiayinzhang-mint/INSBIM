import Vue from "vue";
import "./plugins/vuetify";
import axios from "axios";
import App from "./App";
import router from "./router";
import store from "./store/store";
import dimUpload from "./plugins/upload";

Vue.use(dimUpload);

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  //设置拦截器
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  try {
    config.headers["Authorization"] =
      "INSBIM " + store.getters["user/userInfo"].token;
  } catch (err) {}

  // if (config.method === "post" || config.method === "put") {
  //   config.data = qs.stringify(config.data);
  // }
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
