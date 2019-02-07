<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-toolbar-title>修改密码</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <h4 class="subheading">修改密码</h4>
      <v-divider class="my-2"></v-divider>
      <v-layout justify-center>
        <v-flex xs12 md6>
          <v-form>
            <v-text-field
              id="password"
              v-model="password"
              name="password"
              label="新的密码"
              type="password"
              :rules="[v => !!v || '请输入新的密码']"
            ></v-text-field>
            <v-text-field
              id="checkPassword"
              v-if="password"
              v-model="checkPassword"
              name="checkPassword"
              label="确认密码"
              type="password"
              :rules="[v => !!v || '请再次输入密码']"
            ></v-text-field>
            <v-btn
              color="primary darken-1"
              v-if="password && checkPassword"
              round
              depressed
              block
              @click="changePasswd"
            >确认</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      checkPassword: ""
    };
  },
  methods: {
    changePasswd() {}
  }
};
</script>

<style>
</style>
