import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";

class buildingService {
  static async getStorey() {
    const rspData = await basicService.getRequest("/storey", { key: "block" });
    await store.dispatch("building/updateStorey", rspData.data.storeyList);
    return rspData;
  }

  static async getBlock() {
    const rspData = await basicService.getRequest("/block");
    await store.dispatch("building/updateBlock", rspData.data.blockList);
    return rspData;
  }

  static async createStorey(floor, blockId) {
    const rspData = await basicService.postRequest("/storey", {
      floor: floor,
      blockId: blockId
    });
    await this.getStorey();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async deleteStorey(storeyId) {
    const rspData = await basicService.deleteRequest("/storey", {
      storeyId: storeyId
    });
    await this.getStorey();
    message.snackbar(rspData.msg);
    return rspData;
  }
}
export default buildingService;
