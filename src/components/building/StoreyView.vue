<template>
  <div>
    <v-container grid-list-md>
      <v-layout class="mb-2">
        <v-flex xs12>
          <v-card>
            <v-card-title class="subheading">
              <v-btn flat small round color="primary" @click="goBack">
                <v-icon>arrow_back</v-icon>&nbsp;返回上一级
              </v-btn>
              <v-spacer></v-spacer>
              <v-tabs slider-color="yellow" v-model="tab" centered>
                <v-tabs-slider></v-tabs-slider>
                <v-tab key="1">设备</v-tab>
                <v-tab key="4">设置</v-tab>
              </v-tabs>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-tabs-items v-model="tab">
        <v-tab-item key="1">
          <v-layout>
            <v-flex xs12>
              <v-card>
                <v-toolbar flat color="transparent">
                  <v-toolbar-title class="dim-headline">本层设备</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <!-- <v-btn flat round color="primary" @click="deviceDialog=true">
                    <v-icon>add</v-icon>添加设备
                  </v-btn>-->
                </v-toolbar>
                <v-data-table
                  no-data-text="暂无数据"
                  hide-actions
                  :headers="deviceListHeader"
                  :items="nodeList"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.node_id }}</td>
                    <td class="text-xs-center">{{ props.item.node_type }}</td>
                    <td class="text-xs-center">{{ props.item.gis}}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>

        <v-tab-item key="4">
          <v-layout>
            <v-flex xs12>
              <v-card>
                <v-layout justify-center>
                  <v-flex xs12 md8></v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deviceService from "../../service/DeviceService";
import buildingService from "../../service/BuildingService";
export default {
  data() {
    return {
      block: { name: "" },
      storey: { floor: "" },
      floorNum: 0,
      deviceListShow: [],
      deviceListUngroup: [],
      tab: null,
      deviceDialog: false,
      coordinateDialog: false,
      currentDevice: {
        coordinate: []
      },
      nodeList: [],
      deviceListHeader: [
        {
          text: "名称",
          align: "center",
          sortable: false
        },
        {
          text: "类型",
          align: "center",
          sortable: false
        },
        {
          text: "坐标",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/building" });
    },
    async getBuildingInfo() {
      this.block = this.blockList.find(e => {
        return e._id == this.$route.params.blockId;
      });
      var blockAlt = this.storeyList.find(e => {
        return e.key == this.$route.params.blockId;
      }).item;
      this.storey = blockAlt.find(e => {
        return e._id == this.$route.params.storeyId;
      });
      var floorArr = [];
      blockAlt.forEach(e => {
        floorArr.push(Number(e.floor));
      });
      this.floorNum = Math.max(...floorArr);
    },
    async getNodeList() {
      const rsp = await deviceService.getNodeWithFloor(
        this.$route.params.storeyId
      );
      this.nodeList = rsp.data.nodeList;
    }
  },
  computed: {
    ...mapGetters({
      deviceList: "device/deviceList",
      blockList: "building/blockList",
      storeyList: "building/storeyList"
    })
  },
  async mounted() {
    await this.getBuildingInfo();
    await this.getNodeList();
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    await this.getBuildingInfo();
    await this.getNodeList();
  }
};
</script>

<style>
</style>
