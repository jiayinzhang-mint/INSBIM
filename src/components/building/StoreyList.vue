<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs2>
        <v-navigation-drawer permanent stateless value="true" class="transparent">
          <v-list grid-list-lg style="height:calc(100vh - 85px);overflow :auto" dense>
            <v-list-tile @click="createStorey(storeyListShow[0].floor-1)">
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
            <v-list-tile @click="createStorey(storeyListShow[storeyListShow.length-1].floor+1)">
              <v-spacer></v-spacer>
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-right headline pr-3 mb-2">+</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10>
        <router-view v-if="$route.params.storeyId" @getstoreylistshow="getStoreyListShow"></router-view>
        <v-container v-else fluid fill-height>
          <v-layout align-center justify-center>
            <v-card flat color="transparent">
              <v-btn flat small round color="primary" @click="goBack">
                <v-icon>arrow_back</v-icon>&nbsp;返回上一级
              </v-btn>
              <div class="headline font-weight-light">请选择楼层</div>
            </v-card>
          </v-layout>
        </v-container>
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
    goBack() {
      this.$router.push({ path: "/building" });
    },
    async createStorey(floor) {
      if (floor == 0) {
        floor = -1;
      }
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
