<template>
  <v-container grid-list-md>
    <v-layout class="mb-2">
      <v-flex xs12>
        <v-card>
          <v-card-title class="subheading">
            <v-tabs slider-color="yellow" v-model="tab" centered>
              <v-tabs-slider></v-tabs-slider>
              <v-tab key="1">网关</v-tab>
              <v-tab key="2">消防主机</v-tab>
            </v-tabs>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <v-card>
          <v-toolbar class="transparent" flat>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createDeviceDialog=true">
              <v-icon>add</v-icon>新增
            </v-btn>
            <v-btn flat round color="primary" @click="refreshDevice">
              <v-icon>refresh</v-icon>刷新
            </v-btn>
          </v-toolbar>
          <v-data-table
            rows-per-page-text="每页项数"
            :rows-per-page-items="rowsPerPageItems"
            :search="search"
            no-data-text="暂无数据"
            no-results-text="无结果"
            :headers="deviceHeader"
            :items="deviceList"
            :loading="loading"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.loraAddr }}</td>
              <td class="text-xs-center">{{ props.item.serverAddr }}</td>
              <td class="text-xs-center">{{ props.item.heartCycle }}</td>
              <td class="text-xs-center">{{ props.item.port }}</td>
              <td v-if="props.item.commType==1" class="text-xs-center">TCP</td>
              <td v-else class="text-xs-center">UDP</td>
              <td class="text-xs-center">
                <v-btn flat icon color="primary" :to="`/device/${props.item.loraAddr}`">
                  <v-icon>settings</v-icon>
                </v-btn>

                <v-btn flat icon color="error" @click="deleteDevice(props.item.loraAddr)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="pageText" slot-scope="props">共 {{ props.itemsLength }} 项</template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item key="2">
        
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="createDeviceDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">创建新网关</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="createDeviceForm">
                  <v-text-field
                    label="网关地址*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="device.loraAddr"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="服务器地址*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="device.serverAddr"
                    required
                  ></v-text-field>
                  <v-select
                    :items="typeList"
                    required
                    item-text="label"
                    item-value="value"
                    no-data-text="通信格式"
                    label="通信格式*"
                    :rules="[v => !!v || '请选择通信格式']"
                    v-model="device.commType"
                  ></v-select>
                  <v-text-field
                    label="心跳周期*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="device.heartCycle"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="端口*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="device.port"
                    required
                  ></v-text-field>
                </v-form>
                <small>含*为必填项</small>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="createDeviceDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="createDevice">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="importDeviceDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">批量导入</span>
        </v-card-title>
        <v-container>
          <dim-upload v-model="file" type="xlsx"></dim-upload>
          <small class="text-xs-center">仅支持.xlsx格式</small>
        </v-container>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="importDeviceDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="importDevice">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import deviceService from "@/service/DeviceService";
import gatewayService from "@/service/GatewayService";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: 0,
      createDeviceDialog: false,
      importDeviceDialog: false,
      device: {
        loraAddr: "",
        commType: "",
        heartCycle: "",
        port: "",
        serverAddr: ""
      },
      search: "",
      file: null,
      loading: false,
      // dynamic feature ?
      typeList: [{ label: "UDP", value: 0 }, { label: "TCP", value: 1 }],
      deviceHeader: [
        {
          text: "网关地址",
          value: "loraAddr",
          align: "center",
          sortable: false
        },
        {
          text: "服务器地址",
          value: "serverAddr",
          align: "center",
          sortable: false
        },
        {
          text: "心跳周期",
          value: "heartCycle",
          align: "center",
          sortable: false
        },
        {
          text: "端口",
          value: "port",
          align: "center",
          sortable: false
        },
        {
          text: "通信格式",
          value: "commType",
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
    async createDevice() {
      if (this.$refs.createDeviceForm.validate()) {
        this.loading = true;

        await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "01",
            loraAddr: this.device.loraAddr,
            commType: this.device.commType,
            heartCycle: this.device.heartCycle,
            port: this.device.port,
            serverAddr: this.device.serverAddr
          })
        );
        this.device = {};
        this.createDeviceDialog = false;
        this.loading = false;
      }
    },
    async refreshDevice() {
      await deviceService.getDevice();
    },
    async importDevice() {
      this.loading = true;
      let fileForm = new FormData();
      fileForm.append("name", this.file.name);
      fileForm.append("file", this.file);
      await deviceService.importDevice(fileForm);
      this.file = null;
      this.importDeviceDialog = false;
      this.loading = false;
    },
    async deleteDevice(loraAddr) {
      try {
        await this.$confirm("确认删除?", "本操作无法恢复。");
        await gatewayService.pushSetting(
          JSON.stringify({
            type: "lora",
            state: "02",
            loraAddr: loraAddr
          })
        );
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters({
      deviceList: "device/deviceList"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
