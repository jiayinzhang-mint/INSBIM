import Vue from "vue";
import Vuetify from "vuetify/lib";
import "../assets/style.css";
import colors from "vuetify/es5/util/colors";
import "vuetify/src/stylus/app.styl";
import zhHans from "vuetify/es5/locale/zh-Hans";
import "./confirm-dialog/index";
import "./snackbar/index";

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.lighten2,
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  customProperties: true,
  iconfont: "md",
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
