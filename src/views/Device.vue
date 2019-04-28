<template>
  <v-container grid-list-md>
    <v-card>
      <device-manage></device-manage>
    </v-card>
  </v-container>
</template>

<script>
import deviceManage from "../components/device/SensorManage";
import device from "../store/modules/device";
export default {
  components: {
    deviceManage: deviceManage
  },
  data() {
    return {
      items: [
        {
          title: "传感器",
          route: "/device/sensor"
        }
      ]
    };
  }
};
</script>

<style>
</style>

