<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs2>
        <v-navigation-drawer permanent stateless value="true" class="transparent">
          <v-list>
            <template v-for="(item,j) in items">
              <v-list-tile :key="j" :to="item.route" ripple>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-if="item.heading"
                    class="text-xs-right pr-3 grey--text body-1 font-weight-medium"
                  >{{ item.heading }}</v-list-tile-title>
                  <v-list-tile-title v-else class="text-xs-right pr-3">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
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
          title: "传感器",
          route: "/device/sensor"
        }
      ]
    };
  }
};
</script>

<style>
</style>

