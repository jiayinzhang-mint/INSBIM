<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item,i) in blockList" :key="i">
        <v-card ripple>
          <v-responsive :aspect-ratio="1/1">
            <v-card-title class="font-weight-bold subheading text-uppercase">{{item.name}}</v-card-title>
            <v-img src="/building-icon.png" aspect-ratio="1.65"></v-img>
            <v-card-actions>
              <v-btn round block flat color="primary" :to="'/glance/'+item._id">查看
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-card-actions>
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
