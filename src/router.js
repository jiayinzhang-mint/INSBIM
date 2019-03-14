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
          meta: "仪表板",
          component: () => import("./views/Dashboard")
        },
        {
          path: "/inbox",
          meta: "收件箱",
          component: () => import("./views/Inbox")
        },
        {
          path: "/inbox/:alertId",
          meta: "收件箱",
          component: () => import("./components/inbox/Info")
        },
        {
          path: "/glance",
          meta: "3D 概览",
          component: () => import("./views/Glance")
        },
        {
          path: "/glance/:blockId",
          meta: "3D 概览",
          component: () => import("./components/glance/StoreyList"),
          children: [
            {
              path: "/glance/:blockId/:storeyId",
              meta: "3D 概览",
              component: () => import("./components/glance/ModelView")
            }
          ]
        },
        {
          path: "/building",
          meta: "楼宇管理",
          component: () => import("./views/Building")
        },
        {
          path: "/building/:blockId",
          meta: "楼宇管理",
          component: () => import("./components/building/StoreyList"),
          children: [
            {
              path: "/building/:blockId/:storeyId",
              meta: "楼宇管理",
              component: () => import("./components/building/StoreyView")
            }
          ]
        },
        {
          path: "/device",
          meta: "设备仓库",
          component: () => import("./views/Device"),
          children: [
            {
              path: "/device/sensor",
              meta: "传感器管理",
              component: () => import("./components/device/SensorManage")
            }
          ]
        },
        {
          path: "/user",
          meta: "用户管理",
          component: () => import("./views/User")
        },
        {
          path: "/user/:group",
          meta: "用户管理",
          component: () => import("./components/user/UserList"),
          children: [
            {
              path: "/user/:group/:userId",
              meta: "用户管理",
              component: () => import("./components/user/UserProfile")
            }
          ]
        },
        {
          path: "/profile",
          meta: "用户设置",
          component: () => import("./views/Profile"),
          children: [
            {
              path: "/profile/common",
              meta: "通用设置",
              component: () => import("./components/profile/Common")
            },
            {
              path: "/profile/changepasswd",
              meta: "修改密码",
              component: () => import("./components/profile/ChangePasswd")
            }
          ]
        },
        {
          path: "/structure",
          meta: "系统拓扑",
          component: () => import("./views//Structure")
        }
      ]
    }
  ]
});
