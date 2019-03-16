<template>
  <v-card>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-center class="pb-2 pt-1">
        <h4 class="font-weight-bold mb-1 grey--text">温度监测</h4>
      </v-layout>
    </v-card-title>
    <div id="storeytemperature" style="min-height:300px;" class="chart" ref="echarts"></div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      myChart: null
    };
  },
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/line");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("storeytemperature"));
      myChart.setOption({
        color: ["#ab67d6", "#5bb0e7", "#6f6ced", "#8b7ee8", "#9c43ca"],
        title: {
          text: "Step Line"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["MAIN", "SUB"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            data: [25, 12, 23, 34, 23, 21, 1]
          },
          {
            type: "line",
            data: [21, 12, 23, 12, 4, 12, 21]
          }
        ]
      });
      this.myChart = myChart;
    }
  },
  mounted() {
    this.init();
    setTimeout(() => {
      this.myChart.resize();
    }, 300);
    window.onresize = () => {
      this.myChart.resize();
    };
  }
};
</script>

<style>
</style>
