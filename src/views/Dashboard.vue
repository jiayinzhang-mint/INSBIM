<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs3>
        <service-day></service-day>
      </v-flex>
      <v-flex xs3>
        <temperature></temperature>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3>
        <alert-count></alert-count>
      </v-flex>
      <v-flex xs3>
        <device-online></device-online>
      </v-flex>
      <v-flex xs3>
        <operate-rate></operate-rate>
      </v-flex>
      <v-flex xs3>
        <system-load></system-load>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4>
        <alert-type></alert-type>
      </v-flex>
      <v-flex xs4>
        <alert-state></alert-state>
      </v-flex>
      <v-flex xs4>
        <my-alert></my-alert>
      </v-flex>
      <v-flex xs4>
        <building-score></building-score>
      </v-flex>
      <v-flex xs8 d-flex>
        <alertCountCompare></alertCountCompare>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import alertCount from "../components/widget/block/alert/AlertCount";
import deviceOnline from "../components/widget/block/device/DeviceOnline";
import operateRate from "../components/widget/block/alert/OperatedRate";
import serviceDay from "../components/widget/block/service/ServiceDay";
import systemLoad from "../components/widget/block/service/SystemLoad";
import temperature from "../components/widget/block/others/Temperature";
import alertType from "../components/widget/chart/alert/AlertType";
import alertState from "../components/widget/chart/alert/AlertState";
import myAlert from "../components/widget/chart/alert/MyAlert";
import buildingScore from "../components/widget/chart/building/BuildingScore";
import alertCountCompare from "../components/widget/chart/alert/AlertCountCompare";
export default {
  components: {
    alertCount: alertCount,
    deviceOnline: deviceOnline,
    operateRate: operateRate,
    serviceDay: serviceDay,
    systemLoad: systemLoad,
    temperature: temperature,
    alertType: alertType,
    alertState: alertState,
    myAlert: myAlert,
    buildingScore: buildingScore,
    alertCountCompare: alertCountCompare
  }
};
</script>
