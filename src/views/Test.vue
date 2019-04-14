<template>
  <v-container grid-list-md>
    <v-layout class="mb-2">
      <v-flex xs12>
        <v-card>
          <v-card-title class="subheading">
            <v-tabs slider-color="yellow" v-model="tab" centered>
              <v-tabs-slider></v-tabs-slider>
              <v-tab key="1">Redis</v-tab>
              <v-tab key="2">Node</v-tab>
              <v-tab key="3">Lora</v-tab>
            </v-tabs>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <span class="dim-headline">Redis</span>
                <v-spacer></v-spacer>
                <v-btn flat round @click="pushSetting">PUSH</v-btn>
              </v-card-title>
              <v-container>
                <v-textarea label="Redis" box v-model="redisContent"></v-textarea>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item key="2">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <span class="dim-headline">Node.json</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-container>
                <v-textarea label="Node.json" height="1000" box v-model="nodeContent"></v-textarea>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item key="3">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <span class="dim-headline">Lora.json</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-container>
                <v-textarea label="Lora.json" height="1000" box v-model="loraContent"></v-textarea>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import gatewayService from "../service/GatewayService";
export default {
  data() {
    return {
      tab: 0,
      redisContent: "",
      nodeContent: "",
      loraContent: ""
    };
  },
  methods: {
    async getSetting(key) {
      const rsp = await gatewayService.getSetting(key);
      return JSON.stringify(rsp.data, null, 2);
    },
    async pushSetting() {
      const rsp = await gatewayService.pushSetting(this.redisContent);
    }
  },
  async mounted() {
    this.nodeContent = await this.getSetting("node");
    this.loraContent = await this.getSetting("lora");
  }
};
</script>

<style>
</style>
