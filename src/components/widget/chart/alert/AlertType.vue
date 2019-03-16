<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="subheading font-weight-bold mb-1">
            告警类型
          </div>
        </v-layout>
      </v-card-title>
      <div id="alerttype" style="min-height:300px;height:100%" class="chart" ref="echarts"></div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    myChart: null
  }),
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/pie");
      require("echarts/lib/component/tooltip");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("alerttype"));
      // 绘制图表

      myChart.setOption({
        color: ["#ab67d6", "#5bb0e7", "#6f6ced", "#8b7ee8", "#9c43ca"],
        tooltip: {
          textStyle: {
            color: "#fff"
          },
          trigger: "item",
          formatter: "{b} : {c} 件"
        },
        grid: {
          top: "10px",
          left: "20%",
          right: "20%",
          bottom: "0",
          containLabel: true
        },
        series: [
          {
            name: "维修状态分布",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            // data: this.data.sort(function(a, b) {
            //     return a.value - b.value;
            // }),

            label: {
              normal: {
                textStyle: {
                  color: "rgba(0, 0, 0, 0.8)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(0, 0, 0, 0.8)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut"
          }
        ]
      });
      this.myChart = myChart;
    }
  },
  computed: {},
  async mounted() {
    this.init();
    this.myChart.setOption({
      series: [
        {
          data: [
            { value: 28, name: "紧急" },
            { value: 15, name: "中等" },
            { value: 15, name: "一般" }
          ]
        }
      ]
    });
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
