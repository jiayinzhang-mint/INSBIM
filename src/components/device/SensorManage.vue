<template>
  <div>
    <v-toolbar class="transparent" flat>
      <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-btn flat round color="primary" @click="createDeviceDialog=true">
        <v-icon>add</v-icon>新增
      </v-btn>
      <v-btn flat round color="primary" @click="importDeviceDialog=true">
        <v-icon>playlist_add</v-icon>批量导入
      </v-btn>
      <v-btn flat round color="primary" @click="importDeviceDialog=true">
        <v-icon>play_for_work</v-icon>下载模版
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
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.type }}</td>
        <td class="text-xs-center">{{ props.item.brand }}</td>
        <td class="text-xs-center">
          <v-btn flat icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="error" @click="deleteDevice(props.item._id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="props">共 {{ props.itemsLength }} 项</template>
    </v-data-table>

    <v-dialog v-model="createDeviceDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">创建新设备</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="createDeviceForm">
                  <v-text-field
                    label="名称*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="device.name"
                    required
                  ></v-text-field>
                  <v-text-field label="品牌" v-model="device.brand" required></v-text-field>
                  <v-select
                    :items="typeList"
                    required
                    no-data-text="类型"
                    label="类型*"
                    :rules="[v => !!v || '请选择类型']"
                    v-model="device.type"
                  ></v-select>
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
    <v-dialog v-model="importDeviceDialog" persistent max-width="400px">
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
    </v-dialog>
  </div>
</template>

<script>
import deviceService from "@/service/DeviceService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      createDeviceDialog: false,
      importDeviceDialog: false,
      device: {
        name: "",
        type: "",
        brand: ""
      },
      search: "",
      file: null,
      loading: false,
      // dynamic feature ?
      typeList: ["水压", "水质", "开盖", "烟感", "温感"],
      deviceHeader: [
        {
          text: "名称",
          value: "name",
          align: "center"
        },
        {
          text: "类型",
          value: "type",
          align: "center"
        },
        {
          text: "厂商",
          value: "brand",
          align: "center"
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
        await deviceService.createDevice(this.device);
        this.device = {};
        this.createDeviceDialog = false;
        this.loading = false;
      }
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
    async deleteDevice(id) {
      try {
        await this.$confirm("确认删除?");
        await deviceService.deleteDevice(id);
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
