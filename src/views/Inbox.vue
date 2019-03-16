<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md4 lg3 v-for="(item,i) in alertList" :key="i">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 8 : 2}`"
            ripple
            class="clickable-card"
            :to="'/inbox/'+i"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
            <v-card-title>
              <div class="font-weight-bold">{{item.title}}</div>
              <v-spacer></v-spacer>
              <div v-if="item.level==3">
                <v-icon class="mr-1 mb-1" color="error" style="font-size:12px">lens</v-icon>
                <span class="font-weight-medium">严重</span>
              </div>
              <div v-if="item.level==2">
                <v-icon class="mr-1 mb-1" color="warning" style="font-size:12px">lens</v-icon>
                <span class="font-weight-medium">中等</span>
              </div>
              <div v-if="item.level==1">
                <v-icon class="mr-1 mb-1" color="info" style="font-size:12px">lens</v-icon>
                <span class="font-weight-medium">轻微</span>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      listStyle: 0,
      alertList: [
        {
          title: "告警",
          level: 3
        },
        {
          title: "告警",
          level: 2
        },
        {
          title: "告警",
          level: 1
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
