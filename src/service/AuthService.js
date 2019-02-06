import basicService from "./BasicService";
import message from "../utils/message";
class authService {
  static async login(username, password) {
    const rspData = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    message.snackbar(rspData.msg);
    return rspData;
  }
}
export default authService;
