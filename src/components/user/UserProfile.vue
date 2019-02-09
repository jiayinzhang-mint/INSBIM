<template>
  <v-card>
    <v-container>
      <v-tabs slider-color="yellow" v-model="tab" centered>
        <v-tabs-slider></v-tabs-slider>
        <v-tab key="1">信息</v-tab>
        <v-tab key="2">设置</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
        <v-tab-item key="1"></v-tab-item>
        <v-tab-item key="2">
          <v-btn round color="error darken-1" block depressed>删除用户</v-btn>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: null
    };
  },
  methods: {
    getUserInfo() {}
  },
  computed: {
    ...mapGetters({
      userList: "user/userList"
    })
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

