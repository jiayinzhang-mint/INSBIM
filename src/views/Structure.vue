<template>
  <div class="chart" id="structure" style="min-height:300px;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      myCharts: {}
    };
  },
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/tree");
      require("echarts/lib/component/tooltip");
      this.myChart = echarts.init(document.getElementById("structure"));

      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            itemStyle: {
              borderColor: "#7986cb"
            },
            initialTreeDepth: 3,
            data: [
              {
                name: "公共安防平台",
                children: [
                  {
                    name: "INSBIM",
                    children: [
                      {
                        name: "LORA ONE 协议",
                        children: [
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          }
                        ]
                      },
                      {
                        name: "LTE-m",
                        children: [
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          }
                        ]
                      },
                      {
                        name: "NB",
                        children: [
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          },
                          {
                            name: "1001"
                          }
                        ]
                      },
                      {
                        name: "HTTP",
                        children: [
                          {
                            name: "GPRS",
                            children: [
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              }
                            ]
                          },
                          {
                            name: "4G",
                            children: [
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              }
                            ]
                          },
                          {
                            name: "WIFI",
                            children: [
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              },
                              {
                                name: "1001"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            top: "1%",
            left: "7%",
            bottom: "1%",
            right: "20%",

            symbolSize: 7,

            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 12
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });
    }
  },
  computed: {},
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
