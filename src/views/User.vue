<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs2>
        <v-navigation-drawer permanent stateless value="true" class="transparent">
          <v-list>
            <v-list-tile v-for="(item,i) in items" :key="i" :to="item.route" ripple>
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-right pr-3">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10>
        <v-card>
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "通用",
          route: "/user/common"
        },
        {
          title: "安全",
          route: "/user/security"
        }
      ]
    };
  }
};
</script>

<style>
</style>
