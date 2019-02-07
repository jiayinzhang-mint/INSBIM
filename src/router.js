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
              path: "/device/sensor/:id",
              name: "传感器管理",
              component: () => import("./components/device/SensorManage")
            }
          ]
        },
        {
          path: "/user",
          name: "用户管理",
          component: () => import("./views/User")
        },
        {
          path: "/profile",
          name: "用户设置",
          component: () => import("./views/Profile"),
          children: [
            {
              path: "/profile/common",
              name: "通用设置",
              component: () => import("./components/profile/Common")
            },
            {
              path: "/profile/changepasswd",
              name: "修改密码",
              component: () => import("./components/profile/ChangePasswd")
            }
          ]
        }
      ]
    }
  ]
});
