import basicService from "./BasicService";
import message from "../utils/message";
import store from "../store/store";

class deviceService {
  static async getDevice(key) {
    const rspData = await basicService.getRequest("/device", { key: key });
    await store.dispatch("device/updateDevice", rspData.data.deviceList);
    return rspData;
  }

  static async createDevice(device) {
    const rspData = await basicService.postRequest("/device", device);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async importDevice(file) {
    const rspData = await basicService.postRequest("/device/import", file);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async deleteDevice(deviceId) {
    const rspData = await basicService.deleteRequest("/device", {
      deviceId: deviceId
    });
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }

  static async updateDevice(params) {
    const rspData = await basicService.putRequest("/device", params);
    await this.getDevice();
    message.snackbar(rspData.msg);
    return rspData;
  }
}

export default deviceService;
