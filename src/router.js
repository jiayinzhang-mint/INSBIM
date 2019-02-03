import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./views/Login")
    },
    {
      path: "/index",
      component: () => import("./views/Index"),
      children: [
        {
          path: "/dashboard",
          name: "仪表板",
          component: () => import("./views/Dashboard")
        },
        {
          path: "/device",
          name: "设备管理",
          component: () => import("./views/Device")
        }
      ]
    }
  ]
});
