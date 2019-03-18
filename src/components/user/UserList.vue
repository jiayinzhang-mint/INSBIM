<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card style="height:calc(100vh - 98px);overflow :auto">
          <v-toolbar class="transparent" flat>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createUserDialog=true">
              <v-icon>add</v-icon>新增
            </v-btn>
          </v-toolbar>
          <v-list>
            <v-list-tile
              v-for="(item,i) in userListShow"
              :key="i"
              :to="'/user/'+$route.params.group+'/'+item._id"
              ripple
            >
              <v-list-tile-title class="text-xs-center text-uppercase">{{ item.username }}</v-list-tile-title>
              <v-list-tile-title class="text-xs-center text-uppercase">{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs8 d-flex>
        <router-view @updateuserlist="getUserListShow"></router-view>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createUserDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="dim-headline">创建新用户</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createDeviceForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="用户名*"
                    :rules="[v => !!v || '请填写用户名']"
                    v-model="user.username"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="姓名*"
                    :rules="[v => !!v || '请填写姓名']"
                    v-model="user.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="手机号码" v-model="user.mobile" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="密码*"
                    :rules="[v => !!v || '请填写密码']"
                    v-model="user.password"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="确认密码*" :rules="[v => !!v || '请再次填写密码']" required></v-text-field>
                </v-flex>

                <small>含*为必填项</small>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round flat @click="createUserDialog = false">取消</v-btn>
            <v-btn round color="primary" flat @click="createUser">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import userService from "../../service/UserService.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      file: null,
      loading: false,
      userListShow: [],
      createUserDialog: false,
      user: {},
      userHeader: [
        {
          text: "用户名",
          value: "username",
          align: "center"
        },
        {
          text: "姓名",
          value: "name",
          align: "center"
        }
      ]
    };
  },
  methods: {
    getUserListShow() {
      this.userList.forEach(e => {
        if (e.key == this.$route.params.group) {
          this.userListShow = e.item;
        }
      });
    },
    async createUser() {
      this.user.role = this.$route.params.group;
      await userService.createUser(this.user);
      this.getUserListShow();
      this.createUserDialog = false;
    },
    showProfile() {}
  },
  computed: {
    ...mapGetters({
      userList: "user/userList"
    })
  },
  mounted() {
    this.getUserListShow();
  }
};
</script>

<style>
</style>
