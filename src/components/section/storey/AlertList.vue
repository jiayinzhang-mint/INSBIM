<template>
  <v-card>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-center class="pb-2 pt-1">
        <h4 class="font-weight-bold mb-1 grey--text">历史告警</h4>
      </v-layout>
    </v-card-title>
    <v-list>
      <v-list-tile>
        <v-list-tile-title style="max-width:150px">温度超标</v-list-tile-title>
        <v-list-tile-content>2019-03-16 17:26</v-list-tile-content>
        <v-list-tile-action>严重</v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title style="max-width:150px">pH过高</v-list-tile-title>
        <v-list-tile-content>2019-03-16 15:10</v-list-tile-content>
        <v-list-tile-action>中等</v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title style="max-width:150px">温度超标</v-list-tile-title>
        <v-list-tile-content>2019-03-16 13:41</v-list-tile-content>
        <v-list-tile-action>轻微</v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
</style>
