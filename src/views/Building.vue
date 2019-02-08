<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="dim-headline">共 {{blockList.length}} 栋</div>
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createBlockDialog=true">
              <v-icon>add</v-icon>创建大楼
            </v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item,i) in blockList" :key="i">
        <v-card ripple class="clickable-card">
          <v-responsive :aspect-ratio="1/1">
            <v-card-title class="font-weight-bold subheading text-uppercase">
              {{item.name}}
              <v-spacer></v-spacer>
              <v-btn icon small @click="editBlockDialog=true;block.blockId=item._id">
                <v-icon class="dim-side-icon">settings</v-icon>
              </v-btn>
            </v-card-title>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="1.7"></v-img>

            <v-card-actions>
              <v-btn round block flat color="primary" :to="'/building/'+item._id">查看
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createBlockDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">创建新大楼</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createDeviceForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="名称*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="block.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="最底层*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="block.floorMin"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="最高层*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="block.floorMax"
                    required
                  ></v-text-field>
                </v-flex>
                <small>含*为必填项</small>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="createBlockDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="createBlock">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editBlockDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">编辑信息</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createDeviceForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="名称*"
                    :rules="[v => !!v || '请填写名称']"
                    v-model="block.name"
                    required
                  ></v-text-field>
                </v-flex>
                <small>含*为必填项</small>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="editBlockDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="updateBlock">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import buildingService from "../service/BuildingService";
export default {
  data() {
    return {
      createBlockDialog: false,
      editBlockDialog: false,
      block: {}
    };
  },
  methods: {
    async createBlock() {
      await buildingService.createBlock(this.block);
      this.createBlockDialog = false;
      this.block = {};
    },
    async updateBlock() {
      await buildingService.updateBlock(this.block);
      this.editBlockDialog = false;
      this.block = {};
    }
  },
  computed: {
    ...mapGetters({
      blockList: "building/blockList"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
