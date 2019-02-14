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
                <v-tab key="2">图纸</v-tab>
                <v-tab key="3">模型</v-tab>
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
                  <v-btn flat round color="primary" @click="deviceDialog=true">
                    <v-icon>add</v-icon>添加设备
                  </v-btn>
                </v-toolbar>
                <v-data-table
                  no-data-text="暂无数据"
                  hide-actions
                  :headers="deviceListHeader"
                  :items="deviceListShow"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">{{ props.item.coordinate }}</td>
                    <td class="text-xs-center">
                      <v-tooltip left>
                        <v-btn slot="activator" icon flat color="primary">
                          <v-icon>edit_location</v-icon>
                        </v-btn>
                        <span>编辑坐标</span>
                      </v-tooltip>

                      <v-tooltip right>
                        <v-btn
                          slot="activator"
                          @click="releaseDevice(props.item._id)"
                          icon
                          flat
                          color="error"
                        >
                          <v-icon>clear</v-icon>
                        </v-btn>
                        <span>移出本层</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>
        <v-tab-item key="2"></v-tab-item>
        <v-tab-item key="3"></v-tab-item>
        <v-tab-item key="4">
          <v-layout>
            <v-flex xs12>
              <v-card>
                <v-layout justify-center>
                  <v-flex xs12 md8>
                    <v-btn
                      v-if="storey.floor == floorNum"
                      block
                      round
                      color="error darken-1"
                      depressed
                      @click="deleteStorey"
                    >删除本层</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
    <v-dialog v-model="deviceDialog" scrollable persistent max-width="1000px">
      <v-card>
        <v-container grid-list-md>
          <v-layout>
            <v-flex xs6 d-flex>
              <v-card>
                <v-card-title class="dim-headline">本层设备</v-card-title>
                <v-data-table
                  no-data-text="暂无数据"
                  hide-actions
                  :headers="unGroupHeader"
                  :items="deviceListShow"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">
                      <v-tooltip right>
                        <v-btn
                          slot="activator"
                          icon
                          flat
                          color="error"
                          @click="releaseDevice(props.item._id)"
                        >
                          <v-icon>clear</v-icon>
                        </v-btn>
                        <span>移出本层</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
            <v-flex xs6 d-flex>
              <v-card dark color="primary">
                <v-card-title class="dim-headline">设备仓库</v-card-title>
                <v-data-table
                  no-data-text="暂无数据"
                  hide-actions
                  :headers="unGroupHeader"
                  :items="deviceListUngroup"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">
                      <v-tooltip right>
                        <v-btn slot="activator" icon flat @click="bindDevice(props.item._id)">
                          <v-icon>add</v-icon>
                        </v-btn>
                        <span>移入本层</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn color="primary" round flat @click="deviceDialog = false">完成</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        },
        {
          text: "操作",
          align: "center",
          sortable: false
        }
      ],
      unGroupHeader: [
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
          text: "操作",
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
    async getDeviceList() {
      this.deviceListShow = [];
      this.deviceListUngroup = [];
      this.deviceList.forEach(element => {
        if (
          element.block == this.block._id &&
          element.storey == this.storey._id
        ) {
          this.deviceListShow.push(element);
        }
        if (!element.block && !element.storey) {
          this.deviceListUngroup.push(element);
        }
      });
    },
    async bindDevice(id) {
      await deviceService.updateDevice({
        deviceId: id,
        storeyId: this.storey._id,
        blockId: this.block._id
      });
      await this.getDeviceList();
    },
    async releaseDevice(id) {
      await deviceService.updateDevice({
        deviceId: id,
        storeyId: null,
        blockId: null
      });
      await this.getDeviceList();
    },
    async deleteStorey() {
      try {
        await this.$confirm("确认删除吗？", "本操作无法恢复。");
        await buildingService.deleteStorey(this.storey._id);
        await this.getBuildingInfo();
        this.$emit("getstoreylistshow");
        this.$router.push({ path: "/building/" + this.block._id });
      } catch (err) {
        err;
      }
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
    await this.getDeviceList();
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    await this.getBuildingInfo();
    await this.getDeviceList();
  }
};
</script>

<style>
</style>
