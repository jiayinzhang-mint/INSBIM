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
            <v-btn round flat color="primary" @click="updateLoraConf()">
              <v-icon>save</v-icon>&nbsp;保存
            </v-btn>
          </v-card-title>
          <v-container>
            <v-form ref="loraConfForm">
              <v-text-field
                label="网关地址*"
                :rules="[v => !!v || '请填写名称']"
                v-model="lora.loraAddr"
                required
              ></v-text-field>
              <v-select
                :items="typeList"
                item-text="label"
                item-value="value"
                required
                no-data-text="通信格式"
                label="通信格式*"
                :rules="[v => !!v || '请选择通信格式']"
                v-model="lora.commType"
              ></v-select>
              <v-text-field
                label="服务器地址*"
                :rules="[v => !!v || '请填写名称']"
                v-model="lora.serverAddr"
                required
              ></v-text-field>

              <v-text-field label="端口*" :rules="[v => !!v || '请填写名称']" v-model="lora.port" required></v-text-field>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card>
          <v-card-title class="dim-headline">
            附加参数
            <v-spacer></v-spacer>
            <v-btn round flat color="primary" @click="updateLoraHeartConf()">
              <v-icon>save</v-icon>&nbsp;保存
            </v-btn>
          </v-card-title>
          <v-container>
            <v-form>
              <v-text-field
                label="心跳周期*"
                :rules="[v => !!v || '请填写名称']"
                v-model="lora.heartCycle"
                required
              ></v-text-field>
            </v-form>
            <v-btn round flat color="primary" @click="checkTime">校准时间</v-btn>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title class="dim-headline">
            节点列表
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createNodeDialog=true">
              <v-icon>add</v-icon>新增
            </v-btn>
            <v-btn flat round color="primary" @click="getNodeList">
              <v-icon>refresh</v-icon>刷新
            </v-btn>
          </v-card-title>
          <v-data-table
            rows-per-page-text="每页项数"
            :rows-per-page-items="rowsPerPageItems"
            :search="search"
            no-data-text="暂无数据"
            no-results-text="无结果"
            :headers="nodeHeader"
            :items="nodeList"
            :loading="loading"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.node_id }}</td>
              <td class="text-xs-center">{{ props.item.reportFrequency }}</td>
              <td class="text-xs-center">{{ props.item.calibrationValue }}</td>
              <td class="text-xs-center">{{ props.item.voltFrequency }}</td>
              <td class="text-xs-center">{{ props.item.dataFrequency }}</td>
              <td class="text-xs-center">{{ props.item.MinValue }}</td>
              <td class="text-xs-center">{{ props.item.MaxValue }}</td>
              <td class="text-xs-center">{{ props.item.nodeType }}</td>
              <td class="text-xs-center">
                <v-btn
                  flat
                  icon
                  color="primary"
                  :to="`/device/${props.item.loraAddr}/${props.item.node_id}`"
                >
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-btn flat icon color="error" @click="deleteNode(props.item.node_id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="pageText" slot-scope="props">共 {{ props.itemsLength }} 项</template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createNodeDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">创建节点</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="createNodeForm">
                  <v-text-field
                    label="节点地址*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="node.node_id"
                    required
                  ></v-text-field>
                  <v-select
                    :items="node_type"
                    required
                    item-text="label"
                    item-value="value"
                    no-data-text="节点类型"
                    label="节点类型*"
                    :rules="[v => !!v || '请选择节点类型']"
                    v-model="node.node_type"
                  ></v-select>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="createNodeDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="createNode">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import deviceService from "../../service/DeviceService";
import gatewayService from "../../service/GatewayService";
export default {
  data() {
    return {
      nodeList: [],
      loading: false,
      search: "",
      createNodeDialog: false,
      updateNodeDialog: false,
      lora: {
        loraAddr: "",
        commType: "",
        serverAddr: "",
        port: "",
        heartCycle: ""
      },
      typeList: [{ label: "UDP", value: 0 }, { label: "TCP", value: 1 }],
      node: {
        node_id: "",
        building_num: "",
        company: "",
        node_type: "",
        floor: "",
        gis: {
          lon: "",
          lat: "",
          alt: "",
          gis_type: ""
        }
      },

      node_type: [{ value: "01", label: "水压" }],
      reportFrequency: ["0", "1", "2", "3"],
      nodeHeader: [
        {
          text: "节点地址",
          align: "center",
          sortable: false
        },
        {
          text: "上报周期",
          align: "center",
          sortable: false
        },
        {
          text: "校准值",
          align: "center",
          sortable: false
        },
        {
          text: "电量告警周期",
          align: "center",
          sortable: false
        },
        {
          text: "数据告警周期",
          align: "center",
          sortable: false
        },
        {
          text: "告警最小阈值",
          align: "center",
          sortable: false
        },
        {
          text: "告警最大阈值",
          align: "center",
          sortable: false
        },
        {
          text: "节点类型",
          align: "center",
          sortable: false
        },
        {
          text: "操作",
          align: "center",
          sortable: false
        }
      ],
      rowsPerPageItems: [10, 25, { text: "全部", value: -1 }]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getNodeList() {
      const rsp = await deviceService.getNode(this.$route.params.loraAddr);
      this.nodeList = rsp.data.nodeList;
    },
    async getLoraInfo() {
      const rsp = await deviceService.getDeviceInfo(
        this.$route.params.loraAddr
      );
      this.lora = rsp.data.loraList[0];
      this.lora.commType = parseInt(this.lora.commType);
      console.log(this.lora.commType);
    },
    async checkTime() {
      try {
        await this.$confirm("确认校准时间吗？", "本操作无法恢复。");
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "00",
            loraAddr: this.$route.params.loraAddr
          })
        );
      } catch (err) {
        return err;
      }
    },
    async createNode() {
      if (this.$refs.createNodeForm.validate()) {
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "01",
            loraAddr: this.$route.params.loraAddr,
            node_id: this.node.node_id,
            node_type: this.node.node_type
          })
        );
        this.createNodeDialog = false;
      }
    },
    async updateLoraConf() {
      await gatewayService.pushSetting(
        JSON.stringify({
          type: "lora",
          state: "08",
          loraAddr: this.$route.params.loraAddr,
          commType: this.lora.commType,
          serverAddr: this.lora.serverAddr,
          port: this.lora.port
        })
      );
    },
    async updateLoraHeartConf() {
      await gatewayService.pushSetting(
        JSON.stringify({
          type: "lora",
          state: "06",
          loraAddr: this.$route.params.loraAddr,
          heartCycle: this.lora.heartCycle
        })
      );
    },
    async deleteNode(node_id) {
      try {
        await this.$confirm("确认删除吗？", "本操作无法恢复。");
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "02",
            loraAddr: this.$route.params.loraAddr,
            number: 1,
            node_list: [node_id]
          })
        );
      } catch (err) {
        return err;
      }
    }
  },
  mounted() {
    this.getNodeList();
    this.getLoraInfo();
  }
};
</script>

<style>
</style>
