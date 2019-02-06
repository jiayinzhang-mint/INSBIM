<template>
  <v-app dark>
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
              <span class="font-weight-bold">MINT</span>&nbsp;
            </v-list-tile-title>
          </v-list-tile-content>
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
      <v-text-field
        flat
        hide-details
        solo-inverted
        prepend-inner-icon="search"
        label="搜索"
        style="max-width:400px"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-btn icon class="ml-3">
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
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
        { heading: "数据" },
        {
          icon: "show_chart",
          text: "运行监测",
          route: ""
        },
        { heading: "系统" },
        {
          icon: "domain",
          text: "楼宇管理",
          route: "/building"
        },
        {
          icon: "dns",
          text: "设备管理",
          route: "/device"
        },
        {
          icon: "settings",
          text: "用户设置",
          route: "/user"
        }
      ],
      route: this.$route.name
    };
  },
  watch: {
    $route() {
      this.name = this.$route.name;
    }
  },
  mounted() {
    this.name = this.$route.name;
  }
};
</script>

<style>
</style>
