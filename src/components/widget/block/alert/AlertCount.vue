<template>
  <v-hover>
    <v-card color="primary" dark slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">今日告警</div>
          <div>
            <span class="display-3 font-weight-light">25</span>
            <strong>&nbsp;&nbsp;起</strong>
          </div>
        </v-layout>
      </v-card-title>
      <v-sheet color="transparent">
        <v-sparkline
          :smooth="16"
          color="rgba(255, 255, 255, .7)"
          :line-width="3"
          :value="data"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      data: [423, 446, 675, 510, 590, 610, 760]
    };
  }
};
</script>

<style>
</style>
