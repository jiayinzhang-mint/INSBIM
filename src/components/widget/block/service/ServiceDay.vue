<template>
  <v-hover>
    <v-card color="primary" dark slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">服务已稳定运行</div>
          <div>
            <span class="display-3 font-weight-light">100</span>
            <strong>&nbsp;&nbsp;天</strong>
          </div>
        </v-layout>
      </v-card-title>
      <v-sheet color="transparent"></v-sheet>
    </v-card>
  </v-hover>
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
