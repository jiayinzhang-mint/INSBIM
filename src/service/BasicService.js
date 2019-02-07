import axios from "axios";
import store from "../store/store";

class basicService {
  static async getData(rsp) {
    var rspData = rsp;
    if (rsp.data) rspData = rsp.data;
    // err => no data
    return rspData;
  }

  static async getRequest(url, params) {
    try {
      console.log(params);
      var rsp = await axios.get(url, { params: params });
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    return this.getData(rsp);
  }

  static async postRequest(url, params) {
    try {
      var rsp = await axios.post(url, params);
    } catch (err) {
      return await this.getData(err);
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    return await this.getData(rsp);
  }

  static async putRequest(url, params) {
    try {
      var rsp = await axios.put(url, params);
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    return this.getData(rsp);
  }

  static async deleteRequest(url, params) {
    try {
      var rsp = await axios.delete(url, params);
    } catch (err) {
      return err;
    }
    let json = rsp.data;
    let msg = { url: url, params: params, rsp: json };
    console.log(msg);
    return this.getData(rsp);
  }
}

export default basicService;
