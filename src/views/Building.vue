<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item,i) in blockList" :key="i">
        <v-card ripple class="clickable-card" :to="'/building/'+item._id">
          <v-responsive :aspect-ratio="1/1">
            <v-card-title class="font-weight-bold subheading text-uppercase">{{item.name}}</v-card-title>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      blockList: "building/blockList"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
