<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <v-layout column align-start>
          <div class="subheading font-weight-bold mb-1">楼宇评分</div>
        </v-layout>
      </v-card-title>
      <v-container>
        <div class="chart" id="buildingscore" style="min-height:300px;height:100%"></div>
      </v-container>
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
      require("echarts/lib/chart/radar");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("buildingscore"));

      myChart.setOption({
        title: {
          text: "基础雷达图"
        },
        tooltip: {},
        legend: {
          data: ["楼宇评分"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          shape: "circle",
          indicator: [
            { name: "温度", max: 10 },
            { name: "湿度", max: 10 },
            { name: "水质", max: 10 },
            { name: "空气", max: 10 }
          ],
          name: {
            textStyle: {
              color: "rgb(0, 0, 0)"
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(0, 0, 0, 0.1)",
                "rgba(0, 0, 0, 0.2)",
                "rgba(0, 0, 0, 0.4)",
                "rgba(0, 0, 0, 0.6)",
                "rgba(0, 0, 0, 0.8)",
                "rgba(0, 0, 0, 1)"
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0, 0.5)"
            }
          }
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [8, 6, 9, 7],
                name: "楼宇评分"
              }
            ],
            symbol: "none",
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(18, 164, 240, 0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "rgba(18, 164, 240, 0.1)" // bottom 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(18, 164, 240, 0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "rgba(18, 164, 240, 0.1)" // bottom 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      });
      this.myChart = myChart;
    }
  },
  async mounted() {
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


