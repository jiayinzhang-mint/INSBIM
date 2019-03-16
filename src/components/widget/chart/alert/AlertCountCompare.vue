<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="subheading font-weight-bold mb-1">告警分布</div>
        </v-layout>
      </v-card-title>
      <div id="alertcountcompare" style="min-height:300px;" class="chart" ref="echarts"></div>
    </v-card>
  </v-hover>
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
      var myChart = echarts.init(document.getElementById("alertcountcompare"));
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
            step: "start",
            data: [25, 12, 23, 34, 23, 21, 1]
          },
          {
            type: "line",
            step: "middle",
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
