<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 8 : 2}`"
            ripple
            class="clickable-card"
          >
            <v-responsive :aspect-ratio="1/1">
              <v-card-title class="font-weight-bold subheading">A楼</v-card-title>
            </v-responsive>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import buildingService from "../service/BuildingService";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    buildingService.getBlockAndStorey();
  }
};
</script>

<style>
</style>
