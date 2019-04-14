import basicService from "./BasicService";
import message from "../utils/Message.js";
import store from "../store/store";
class authService {
  static async login(username, password) {
    const rspData = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    if (rspData.data) {
      var userInfo = rspData.data.user;
      store.dispatch("user/login", userInfo);
    }
    message.snackbar(rspData.msg);
    return rspData;
  }
}
export default authService;
