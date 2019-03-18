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
        <v-tab-item key="1">
          <v-container>
            <h4 class="subheading">用户信息</h4>
            <v-divider class="my-2"></v-divider>
            <v-layout justify-center>
              <v-flex xs12 md6>
                <v-form>
                  <v-text-field disabled v-model="userInfo.username" label="用户名"></v-text-field>
                  <v-text-field disabled v-model="userInfo.name" label="姓名"></v-text-field>
                  <v-text-field disabled v-model="userInfo.mobile" label="电话"></v-text-field>
                  <v-text-field disabled v-model="userInfo.createTime" label="创建时间"></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item key="2">
          <v-btn round color="error darken-1" block depressed @click="deleteUser()">删除用户</v-btn>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import userService from "../../service/UserService";
export default {
  data() {
    return {
      tab: null,
      userInfo: {}
    };
  },
  methods: {
    async getUserInfo() {
      const rsp = await userService.getUserInfo(this.$route.params.userId);
      this.userInfo = rsp.data.userList[0];
    },
    async deleteUser() {
      try {
        await this.$confirm("确认删除吗？", "本操作无法恢复。");
        await userService.deleteUser(this.$route.params.userId);
        this.$emit("updateuserlist");
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters({
      userList: "user/userList"
    })
  },
  mounted() {
    this.getUserInfo();
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    this.getUserInfo();
  }
};
</script>

