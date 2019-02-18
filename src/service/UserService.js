import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";

class userService {
  static async getUser() {
    const rspData = await basicService.getRequest("/user");
    await store.dispatch("user/updateUserList", rspData.data.userList);
    return rspData;
  }

  static async createUser(user) {
    const rspData = await basicService.postRequest("/user", user);
    await this.getUser();
    message.snackbar(rspData.msg);
    return rspData;
  }
}

export default userService;
