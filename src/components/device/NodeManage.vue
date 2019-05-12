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
      <v-flex xs12>
        <v-card>
          <v-btn flat @click="checkTime">校准时间</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title class="dim-headline">
            设备列表
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createNodeDialog=true">
              <v-icon>add</v-icon>新增
            </v-btn>
            <v-btn flat round color="primary" @click="refreshNode">
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
              <td class="text-xs-center">{{ props.item.nodeAddr }}</td>
              <td class="text-xs-center">{{ props.item.reportFrequency }}</td>
              <td class="text-xs-center">{{ props.item.calibrationValue }}</td>
              <td class="text-xs-center">{{ props.item.voltFrequency }}</td>
              <td class="text-xs-center">{{ props.item.dataFrequency }}</td>
              <td class="text-xs-center">{{ props.item.MinValue }}</td>
              <td class="text-xs-center">{{ props.item.MaxValue }}</td>
              <td class="text-xs-center">{{ props.item.loraType }}</td>
              <td class="text-xs-center">
                <v-btn flat icon color="error">
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
                    label="node地址*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="node.nodeAddr"
                    required
                  ></v-text-field>
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
      node: {
        nodeAddr: ""
      },
      nodeHeader: [
        {
          text: "node地址",
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
    async refreshNode() {
      const rsp = await deviceService.getNode(this.$route.params.loraAddr);
      this.nodeList = rsp.data.nodeList;
    },
    async checkTime() {
      const rsp = await gatewayService.pushSetting(
        JSON.stringify({
          type: "lora",
          state: "00",
          loraAddr: this.$route.params.loraAddr
        })
      );
    },
    async createNode() {
      if (this.$refs.createNodeForm.validate()) {
        const rsp = await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "01",
            loraAddr: this.$route.params.loraAddr,
            number: 1,
            node_list: [this.node.nodeAddr]
          })
        );
      }
    }
  },
  mounted() {
    this.refreshNode();
  }
};
</script>

<style>
</style>
