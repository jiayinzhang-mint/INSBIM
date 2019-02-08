<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex sm12 md8 xl6>
            <v-card class="elevation-12">
              <v-layout row wrap fill-height>
                <v-flex md6 class="hidden-sm-and-down">
                  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
                    <v-layout align-center column justify-center>
                      <h1 class="display-2 font-weight-light mb-3">INSBIM</h1>
                      <h4 class="body-2">
                        Powered By DIMLAB
                        <span class="caption">&reg;</span>
                      </h4>
                    </v-layout>
                  </v-parallax>
                </v-flex>
                <v-flex xs12 md6>
                  <v-container>
                    <v-flex sm8 xs10 offset-sm2 offset-xs1>
                      <v-card-title primary-title class="pt-5">
                        <div>
                          <h3 class="headline mb-0">登录</h3>
                          <div class="body-2 mt-1">请输入账号信息</div>
                        </div>
                      </v-card-title>
                      <v-card-text>
                        <v-form>
                          <v-text-field
                            prepend-icon="person"
                            name="login"
                            label="用户名"
                            v-model="username"
                            type="text"
                            :rules="[v => !!v || '请填写用户名']"
                          ></v-text-field>
                          <v-text-field
                            id="password"
                            v-model="password"
                            prepend-icon="lock"
                            name="password"
                            label="密码"
                            type="password"
                            :rules="[v => !!v || '请输入密码']"
                            @keyup.enter="login"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="pb-5">
                        <v-btn block round depressed color="primary darken-1" @click="login">登录</v-btn>
                      </v-card-actions>
                    </v-flex>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import authService from "../service/AuthService";
import buildingService from "../service/BuildingService";
import deviceService from "../service/DeviceService";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      var rspData = await authService.login(this.username, this.password);
      await buildingService.getStorey();
      await buildingService.getBlock();
      await deviceService.getDevice();
      if (rspData.msg) {
        this.$router.push({ path: "/dashboard" });
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
