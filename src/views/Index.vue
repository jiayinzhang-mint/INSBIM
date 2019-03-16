<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile avatar class="pt-3">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
        </v-list-tile>
        <v-list-tile class="pb-2">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">
              早上好,
              <span class="font-weight-bold text-uppercase">{{userInfo.username}}</span>&nbsp;
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu bottom left>
              <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(item, index) in userMenu" ripple :key="index" :to="item.route">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
        <template v-for="(item,j) in menu">
          <v-layout v-if="item.heading" :key="j" row align-center>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator" ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" :to="item.route" ripple>
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.route" ripple>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute class="transparent" flat>
      <v-toolbar-side-icon class="hidden-lg-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title font-weight-bold ml-1 mr-5">
        INSBIM
        <span class="dim-subtitle">| {{name}}</span>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon class="ml-3">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>help_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      name: "",
      menu: [
        { heading: "通用" },
        {
          icon: "dashboard",
          text: "仪表板",
          route: "/dashboard"
        },
        {
          icon: "inbox",
          text: "收件箱",
          route: "/inbox"
        },
        { heading: "运行" },
        {
          icon: "3d_rotation",
          text: "3D 概览",
          route: "/glance"
        },
        {
          icon: "report",
          text: "分析报告",
          route: ""
        },
        { heading: "系统" },
        {
          icon: "line_style",
          text: "系统拓扑",
          route: "/structure"
        },
        {
          icon: "domain",
          text: "楼宇管理",
          route: "/building"
        },
        {
          icon: "dns",
          text: "设备仓库",
          route: "/device"
        },
        {
          icon: "person",
          text: "用户管理",
          route: "/user"
        },
        {
          icon: "settings",
          text: "用户设置",
          route: "/profile"
        }
      ],
      userMenu: [
        {
          icon: "exit_to_app",
          title: "注销",
          route: "/"
        }
      ],
      route: this.$route.name
    };
  },
  watch: {
    $route() {
      this.name = this.$route.meta;
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.name = this.$route.meta;
  }
};
</script>

<style>
</style>
