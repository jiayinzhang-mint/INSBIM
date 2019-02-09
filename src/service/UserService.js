import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";

class userService {
  static async createUser(user) {}

  static async getUser() {
    const rspData = await basicService.getRequest("/user");
    await store.dispatch("user/updateUserList", rspData.data.userList);
    return rspData;
  }
}

export default userService;
