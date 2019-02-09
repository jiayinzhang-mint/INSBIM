<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item,i) in roleList" :key="i">
        <v-card ripple>
          <v-responsive :aspect-ratio="1/1">
            <v-card-title class="font-weight-bold subheading text-uppercase">{{item}}</v-card-title>
            <v-img src="/img/manager-icon.png" aspect-ratio="1.65"></v-img>
            <v-card-actions>
              <v-btn :to="'/user/'+item" round block flat color="primary">查看
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import userService from "../service/UserService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roleList: []
    };
  },
  methods: {
    getRoleList() {
      this.userList.forEach(e => {
        this.roleList.push(e.key);
      });
    }
  },
  computed: {
    ...mapGetters({
      userList: "user/userList"
    })
  },
  mounted() {
    this.getRoleList();
  }
};
</script>

<style>
</style>
