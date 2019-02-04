<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-toolbar flat class="transparent sub-toolbar">
        <v-btn icon>
          <v-icon>sort</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="listStyle">
          <v-btn flat>
            <v-icon>view_module</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>view_list</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <v-flex xs12 md4 lg3>
        <v-card ripple>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title>
            <div class="font-weight-bold">告警</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-1" color="error" style="font-size:12px">lens</v-icon>
            <span class="font-weight-medium">严重</span>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <v-card ripple>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title>
            <div class="font-weight-bold">告警</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-1" color="warning" style="font-size:12px">lens</v-icon>
            <span class="font-weight-medium">中等</span>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <v-card ripple>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title>
            <div class="font-weight-bold">告警</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-1" color="success" style="font-size:12px">lens</v-icon>
            <span class="font-weight-medium">轻微</span>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      listStyle: 0
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
