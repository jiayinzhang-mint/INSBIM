<template>
  <v-hover>
    <v-card color="primary" dark slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">处理率</div>
          <div>
            <span class="display-3 font-weight-light">98</span>
            <strong>&nbsp;&nbsp;%</strong>
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
      data: [236, 446, 631, 232, 590, 127, 760]
    };
  }
};
</script>

<style>
</style>

