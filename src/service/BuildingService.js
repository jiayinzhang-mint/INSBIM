import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";
import { mapGetters } from "vuex";

class buildingService {
  static async getBlockAndStorey() {
    const rspData = await basicService.getRequest("/storey", { key: "block" });
  }
}
export default buildingService;
