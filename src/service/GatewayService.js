import basicService from "./BasicService";
import message from "../utils/Message";
import Vue from "vue";
const vue = new Vue();

class gatewayService {
  static async getSetting(key) {
    const rspData = await basicService.getRequest("/gateway", {
      key: key
    });
    return rspData;
  }
  static async pushSetting(value) {
    vue.$loading.show(true);
    const rspData = await basicService.postRequest("/gateway", {
      value: value
    });
    message.snackbar(rspData.data.data);
    vue.$loading.show(false);
    return rspData;
  }
}
export default gatewayService;
