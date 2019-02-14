<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs2 lg1>
        <v-navigation-drawer permanent stateless value="true" class="transparent">
          <v-list class="storeylist" dense>
            <v-list-tile
              v-for="(item,i) in storeyListShow"
              :key="i"
              :to="'/glance/'+$route.params.blockId +'/'+item._id"
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
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
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
