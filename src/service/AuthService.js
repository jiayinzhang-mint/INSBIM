import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";
class authService {
  static async login(username, password) {
    const rspData = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    var userInfo = rspData.data.user;
    store.dispatch("user/login", userInfo);
    message.snackbar(rspData.msg);
    return rspData;
  }
}
export default authService;
