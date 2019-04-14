import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class userService {
  static async getUser() {
    const rspData = await basicService.getRequest("/user", {
      key: "role"
    });
    await store.dispatch("user/updateUserList", rspData.data.userList);
    return rspData;
  }

  static async getUserInfo(userId) {
    const rspData = await basicService.getRequest("/user", {
      userId: userId
    });
    return rspData;
  }

  static async createUser(user) {
    const rspData = await basicService.postRequest("/user", user);
    await this.getUser();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async deleteUser(userId) {
    console.log(userId);
    const rspData = await basicService.deleteRequest("/user", {
      userId: userId
    });
    await this.getUser();
    message.snackbar(rspData.msg);
    return rspData;
  }
}

export default userService;
