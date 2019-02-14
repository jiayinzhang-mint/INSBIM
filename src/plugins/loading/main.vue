<template>
  <v-layout row justify-center id="app" app-data="true">
    <v-dialog dark v-model="x" hide-overlay persistent width="300">
      <v-card color="primary">
        <v-card-text>请稍后
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "Loading",
  data: () => ({
    x: false
  }),
  methods: {
    show(toggle) {
      if (toggle) {
        this.x = true;
      } else {
        this.x = false;
      }
    }
  }
};
</script>

<style>
</style>
