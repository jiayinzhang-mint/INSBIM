import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class gatewayService {
  static async getSetting(key) {
    const rspData = await basicService.getRequest("/gateway", {
      key: key
    });
    return rspData;
  }
  static async pushSetting(value) {
    const rspData = await basicService.postRequest("/gateway", {
      value: value
    });
    message.snackbar(rspData.msg);
    return rspData;
  }
}
export default gatewayService;
