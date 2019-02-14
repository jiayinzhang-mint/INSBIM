import Vue from "vue";
import Loading from "./main";
const loadingBox = (Vue.prototype.$loading = new Vue(Loading).$mount());
document.body.appendChild(loadingBox.$el);
