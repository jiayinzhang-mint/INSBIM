<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs2 lg1>
        <v-navigation-drawer permanent stateless value="true" class="transparent">
          <v-list>
            <v-list-tile @click="createStorey">
              <v-spacer></v-spacer>
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-right headline pr-3 mb-2">+</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(item,i) in storeyListShow"
              :key="i"
              :to="'/building/'+$route.params.blockId +'/'+item._id"
              ripple
            >
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-right pr-3">{{ item.floor }} F</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10 lg11>
        <router-view @getstoreylistshow="getStoreyListShow"></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import buildingService from "../../service/BuildingService";
export default {
  data() {
    return {
      storeyListShow: []
    };
  },
  methods: {
    getStoreyListShow() {
      this.storeyList.forEach(element => {
        if (element.key == this.$route.params.blockId) {
          this.storeyListShow = element.item;
        }
      });
    },
    async createStorey() {
      const floor = this.storeyListShow.length + 1;
      const blockId = this.$route.params.blockId;
      await buildingService.createStorey(floor, blockId);
      this.getStoreyListShow();
    }
  },
  computed: {
    ...mapGetters({
      storeyList: "building/storeyList"
    })
  },
  mounted() {
    this.getStoreyListShow();
  }
};
</script>

<style>
</style>
