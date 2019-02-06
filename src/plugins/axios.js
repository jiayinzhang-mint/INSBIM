import axios from "axios";
import qs from "qs";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  config => {
    if (config.method === "post" || config.method === "put") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
