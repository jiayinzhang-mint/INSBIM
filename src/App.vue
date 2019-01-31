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
              <span class="font-weight-bold">MINT</span>&nbsp;
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="(item,i) in menu">
          <div :key="i">
            <v-list-tile :to="item.route" ripple>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute class="transparent" flat>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title font-weight-bold ml-1 mr-5">INSBIM</span>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      menu: [
        {
          icon: "dashboard",
          text: "仪表板",
          route: "/"
        },
        {
          icon: "inbox",
          text: "收件箱",
          route: ""
        },
        {
          icon: "show_chart",
          text: "运行监测",
          route: ""
        },
        {
          icon: "settings",
          text: "用户设置",
          route: ""
        }
      ]
    };
  }
};
</script>
