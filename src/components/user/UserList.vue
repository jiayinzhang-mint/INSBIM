<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card style="height:calc(100vh - 98px);overflow :auto">
          <v-toolbar class="transparent" flat>
            <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn flat round color="primary" @click="createDeviceDialog=true">
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
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      file: null,
      loading: false,
      userListShow: [],
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
