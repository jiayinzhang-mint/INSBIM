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
}
export default buildingService;
