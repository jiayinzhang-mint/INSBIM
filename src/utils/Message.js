import Vue from "vue";
const vue = new Vue();
class message {
  static snackbar(msg) {
    if (msg == "success") {
      vue.$snackbar.show("success");
    } else {
      vue.$snackbar.show("fail");
    }
  }
}
export default message;
