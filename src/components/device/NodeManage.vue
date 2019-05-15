<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="subheading">
            <v-btn flat small round color="primary" @click="goBack">
              <v-icon>arrow_back</v-icon>&nbsp;返回上一级
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title class="dim-headline">
            基本参数
            <v-spacer></v-spacer>
            <v-btn round flat color="primary" @click="updateNode()">
              <v-icon>save</v-icon>&nbsp;保存
            </v-btn>
          </v-card-title>
          <v-container>
            <v-form ref="updateNodeForm">
              <v-text-field
                label="节点地址*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.node_id"
                required
                disabled
              ></v-text-field>
              <v-select
                :items="node_type"
                required
                item-text="label"
                item-value="value"
                no-data-text="节点类型"
                label="节点类型*"
                :rules="[v => !!v || '请选择节点类型']"
                v-model="nodeConf.node_type"
              ></v-select>
              <v-select
                :items="reportFrequency"
                required
                no-data-text="上报频率"
                label="上报频率*"
                :rules="[v => !!v || '请选择上报频率']"
                v-model="nodeConf.reportFrequency"
              ></v-select>
              <v-text-field
                label="校准值*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.calibrationValue"
                required
              ></v-text-field>
              <v-text-field
                label="电量告警频率*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.voltFrequency"
                required
              ></v-text-field>
              <v-text-field
                label="电压告警频率*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.dataFrequency"
                required
              ></v-text-field>
              <v-text-field
                label="最大阈值*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.MaxValue"
                required
              ></v-text-field>
              <v-text-field
                label="最小阈值*"
                :rules="[v => !!v || '请填写名称']"
                v-model="nodeConf.MinValue"
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card>
          <v-card-title class="dim-headline">
            位置参数
            <v-spacer></v-spacer>
            <v-btn round flat color="primary" @click="updateNodeInfo()">
              <v-icon>save</v-icon>&nbsp;保存
            </v-btn>
          </v-card-title>
          <v-container>
            <v-form ref="updateNodeInfoForm">
              <v-text-field label="厂商" v-model="nodeConf.company"></v-text-field>
              <v-select
                :items="blockList"
                no-data-text="楼宇"
                item-text="name"
                item-value="_id"
                label="楼宇"
                v-model="nodeConf.building_num"
              ></v-select>
              <v-select
                v-if="nodeConf.building_num"
                :items="storeyListShow.item"
                item-text="floor"
                item-value="_id"
                label="楼层"
                v-model="nodeConf.floor"
              ></v-select>
              <v-text-field label="经度" v-model="nodeConf.gis.lng"></v-text-field>
              <v-text-field label="纬度" v-model="nodeConf.gis.lat"></v-text-field>
              <v-text-field label="高度" v-model="nodeConf.gis.alt"></v-text-field>
              <v-text-field label="GIS类型" v-model="nodeConf.gis.gis_type"></v-text-field>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import deviceService from "../../service/DeviceService";
import gatewayService from "../../service/GatewayService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      nodeConf: {
        node_id: "",
        node_type: "",
        reportFrequency: "",
        calibrationValue: "",
        voltFrequency: "",
        dataFrequency: "",
        MaxValue: "",
        MinValue: "",
        building_num: "",
        company: "",
        floor: "",
        gis: {
          lng: "",
          lat: "",
          alt: "",
          gis_type: ""
        }
      },
      node_type: [{ value: "01", label: "水压" }],
      reportFrequency: ["0", "1", "2", "3"],
      storeyListShow: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getNodeInfo() {
      const rsp = await deviceService.getNodeInfo(this.$route.params.node_id);
      var nodeConf = rsp.data.nodeList[0];
      if (!nodeConf.gis) {
        nodeConf.gis = {
          lng: "",
          lat: "",
          alt: "",
          gis_type: ""
        };
      }
      this.nodeConf = nodeConf;
    },
    async updateNode() {
      if (this.$refs.updateNodeForm.validate()) {
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "04",
            loraAddr: this.$route.params.loraAddr,
            node_id: this.$route.params.node_id,
            node_type: this.nodeConf.node_type,
            reportFrequency: this.nodeConf.reportFrequency,
            calibrationValue: this.nodeConf.calibrationValue,
            voltFrequency: this.nodeConf.voltFrequency,
            dataFrequency: this.nodeConf.dataFrequency,
            MaxValue: this.nodeConf.MaxValue,
            MinValue: this.nodeConf.MinValue
          })
        );
        this.updateNodeDialog = false;
      }
    },
    async updateNodeInfo() {
      if (this.$refs.updateNodeInfoForm.validate()) {
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "12",
            loraAddr: this.$route.params.loraAddr,
            node_id: this.$route.params.node_id,
            building_num: this.nodeConf.building_num,
            company: this.nodeConf.company,
            floor: this.nodeConf.floor,
            gis: this.nodeConf.gis
          })
        );
        this.updateNodeDialog = false;
      }
    },

  },
  watch: {
    nodeConf: function(v) {
      if (this.nodeConf.building_num) {
        this.storeyListShow = this.storeyList.find(e => {
          return e.key == this.nodeConf.building_num;
        });
        console.log(this.storeyListShow);
      }
    }
  },
  computed: {
    ...mapGetters({
      blockList: "building/blockList",
      storeyList: "building/storeyList"
    })
  },
  mounted() {
    this.getNodeInfo();
  }
};
</script>

<style>
</style>
