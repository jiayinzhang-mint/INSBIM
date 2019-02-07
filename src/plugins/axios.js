import Vue from "vue";
import axios from "axios";
axios.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  return config;
});

Vue.use(axios);
