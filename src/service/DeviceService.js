import basicService from "./BasicService";
import message from "../utils/Message";
import store from "../store/store";

class deviceService {
  static async getDevice(key) {
    const rspData = await basicService.getRequest("/lora", { key: key });
    await store.dispatch("device/updateDevice", rspData.data.loraList);
    return rspData;
  }

  static async getDeviceInfo(loraAddr) {
    const rspData = await basicService.getRequest("/lora", {
      loraAddr: loraAddr
    });
    return rspData;
  }

  static async getNode(loraAddr) {
    const rspData = await basicService.getRequest("/node", {
      loraAddr: loraAddr
    });
    return rspData;
  }

  static async getNodeWithFloor(floor) {
    const rspData = await basicService.getRequest("/node", {
      floor: floor
    });
    return rspData;
  }

  static async getNodeInfo(nodeAddr) {
    const rspData = await basicService.getRequest("/node", {
      nodeAddr: nodeAddr
    });
    return rspData;
  }

  static async getNodeData(nodeAddr){
    const rspData = await basicService.getRequest("/node/data", {
      nodeAddr: nodeAddr
    });
    return rspData;
  }

  static async createDevice(device) {
    const rspData = await basicService.postRequest("/gateway", device);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async importDevice(file) {
    const rspData = await basicService.postRequest("/lora/import", file);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async deleteDevice(deviceId) {
    const rspData = await basicService.deleteRequest("/lora", {
      deviceId: deviceId
    });
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async updateDevice(params) {
    const rspData = await basicService.putRequest("/lora", params);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }
}

export default deviceService;
