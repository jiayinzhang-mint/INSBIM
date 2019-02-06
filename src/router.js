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
          path: "/inbox",
          name: "收件箱",
          component: () => import("./views/Inbox")
        },
        {
          path: "/building",
          name: "楼宇管理",
          component: () => import("./views/Building")
        },
        {
          path: "/device",
          name: "设备管理",
          component: () => import("./views/Device"),
          children: [
            {
              path: "/device/waterpressure",
              name: "水压传感器",
              component: () => import("./components/device/WaterPressure")
            },
            {
              path: "/device/cap",
              name: "开盖传感器",
              component: () => import("./components/device/Cap")
            },
            {
              path: "/device/waterquality",
              name: "水质传感器",
              component: () => import("./components/device/WaterQuality")
            },
            {
              path: "/device/temperature",
              name: "温度感应",
              component: () => import("./components/device/Temperature")
            },
            {
              path: "/device/smoke",
              name: "烟雾感应器",
              component: () => import("./components/device/Smoke")
            }
          ]
        },
        {
          path: "/user",
          name: "用户设置",
          component: () => import("./views/User"),
          children: [
            {
              path: "/user/common",
              name: "通用设置",
              component: () => import("./components/user/Common")
            },
            {
              path: "/user/security",
              name: "安全设置",
              component: () => import("./components/user/Security")
            }
          ]
        }
      ]
    }
  ]
});
