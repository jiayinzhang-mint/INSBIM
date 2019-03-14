<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs3>
        <v-hover>
          <v-card
            color="primary"
            dark
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
            <v-card-title>
              <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
              <v-layout column align-start>
                <div class="body-2 font-weigth-bold mb-1">今日告警</div>
                <div>
                  <span class="display-3 font-weight-light">25</span>
                  <strong>&nbsp;&nbsp;起</strong>
                </div>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card
            color="primary"
            dark
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
            <v-card-title>
              <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
              <v-layout column align-start>
                <div class="body-2 font-weigth-bold mb-1">处理率</div>
                <div>
                  <span class="display-3 font-weight-light">98</span>
                  <strong>&nbsp;&nbsp;%</strong>
                </div>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card
            color="primary"
            dark
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
            <v-card-title>
              <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
              <v-layout column align-start>
                <div class="body-2 font-weigth-bold mb-1">设备在线率</div>
                <div>
                  <span class="display-3 font-weight-light">97</span>
                  <strong>&nbsp;&nbsp;%</strong>
                </div>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card
            color="primary"
            dark
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
            <v-card-title>
              <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
              <v-layout column align-start>
                <div class="body-2 font-weigth-bold mb-1">服务已运行</div>
                <div>
                  <span class="display-3 font-weight-light">100</span>
                  <strong>&nbsp;&nbsp;天</strong>
                </div>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs4>
        <v-hover>
          <v-card
            color="primary"
            dark
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
          
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
