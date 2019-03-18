const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export default {
  data: {},

  formatDateTime: function(val) {
    if (String(val).length === 10) {
      val = val * 1000;
    }
    if (val != null && val != undefined && val != "") {
      let num = 0 - val;
      num = 0 - num;
      let date = new Date(num);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return (
        [year, month, day].map(formatNumber).join("-") +
        " " +
        [hour, minute, second].map(formatNumber).join(":")
      );
    }
    return "无";
  },

  timeToDate: function(val) {
    //timeStamp 转 Date
    if (String(val).length === 10) {
      return new Date(val * 1000);
    }
    return new Date(val);
  },

  formatDayTime: function(val) {
    if (String(val).length === 10) {
      val = val * 1000;
    }
    if (val != null && val != undefined && val != "") {
      let num = 0 - val;
      num = 0 - num;
      let date = new Date(num);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return [year, month, day].map(formatNumber).join("-");
    }
    return "无";
  }
};
