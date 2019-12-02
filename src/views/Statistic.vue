<template>
  <v-card raised class="mx-auto text-center" width="95%" height="95%">
    <div id="chart">
      <apexchart type=bar height=350 :options="chartOptions" :series="series" />
    </div>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm2>
          <div class="firstelement">
            <v-autocomplete :items="sexs" label="성별" v-model="sex"></v-autocomplete>
          </div>
        </v-flex>
        <v-flex xs12 sm2>
          <div class="another">
            <v-autocomplete :items="countries" label="국적" v-model="country"></v-autocomplete>
          </div>
        </v-flex>
        <v-flex xs12 sm2>
          <div class="another">
            <v-autocomplete :items="statuses" label="상태" v-model="status"></v-autocomplete>
          </div>
        </v-flex>

        <v-flex xs12 sm2>
          <div class="another">
            <v-menu
              :close-on-content-click="false"
              ref="menu"
              v-model="menu"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="생년월일"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="indigo" @click="menu = false">취소</v-btn>
                <v-btn text color="indigo" @click="$refs.menu.save(date)">확인</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </v-flex>

        <v-flex xs12 sm2>
          <div class="another">
            <v-autocomplete :items="applies" label="지원종류" v-model="apply"></v-autocomplete>
          </div>
        </v-flex>
        <v-flex xs12 sm2>
          <div class="another">
            <div v-if="apply === '법률'">
              <v-autocomplete :items="laws" label="법률 종류" v-model="support"></v-autocomplete>
            </div>
            <div v-else-if="apply === '심리'">
              <v-autocomplete :items="Psychology" label="심리 종류" v-model="support"></v-autocomplete>
            </div>
            <div v-else-if="apply === '사회'">
              <v-autocomplete :items="socials" label="사회 종류" v-model="support"></v-autocomplete>
            </div>
          </div>
        </v-flex>
      </v-layout>

      <div class="test">
      <v-layout justify-center="">
        <v-flex xs12 sm2>
            <v-menu
              :close-on-content-click="false"
              ref="menu2"
              v-model="menu2"
              :return-value.sync="filterdate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="filterdate"
                  label="검색 날짜"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="filterdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="indigo" @click="menu2 = false">취소</v-btn>
                <v-btn text color="indigo" @click="$refs.menu2.save(filterdate)">확인</v-btn>
              </v-date-picker>
            </v-menu>
        </v-flex>
      </v-layout>
      </div>

      <v-layout justify-center="">
        <div class="buttonclass">
          <v-btn dark small color="indigo darken-2" id="month">월별 검색</v-btn>
          <v-btn dark small color="indigo darken-2">일별 검색</v-btn>
        </div>
      </v-layout>
      <v-layout>
        <v-card class="mx-auto" width="1400" height="200" outlined >
          <v-card-text>
            statistic result
          </v-card-text>
          <v-layout row>
            <v-flex>
              <v-card class="mx-auto cardsize" outlined>
                <v-card-text>
                  성별
                </v-card-text>
                10
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="mx-auto cardsize" outlined>
                <v-card-text>
                  국적
                </v-card-text>
                10
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="mx-auto cardsize" outlined>
                <v-card-text>
                  날짜
                </v-card-text>
                10
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="mx-auto cardsize" outlined>
                <v-card-text>
                  상태
                </v-card-text>
                10
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="mx-auto cardsize" outlined>
                <v-card-text>
                  지원종류
                </v-card-text>
                10
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';

export default{
  name: 'Statistic',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      sexs: ['남', '여'],
      countries: [
        '기니',
        '남아공',
        '라이베리아',
        '러시아',
        '르완다',
        '모로코',
        '방글라데시',
        '부룬디',
        '사우디아라비아',
        '세네갈',
        '소말리아',
        '수단',
        '아이티',
        '알제리',
        '앙골라',
        '에티오피아',
        '예멘',
        '이라크',
        '이란',
        '이집트',
        '인도',
        '케냐',
        '코트디부아르',
        '파키스탄',
        'DRC'
      ],
      statuses: ['신청 전', '신청', '이의 신청', '1심', '2심', '3심', '재신청', '불법 체류', '다른 비자', '기타'],
      applies: ['법률', '의료', '심리', '사회'],
      apply: '', // 대분류 지원
      laws: ['인정 처우', '신청', '소송', '기타 법률'],
      Psychology: ['인테이크', '심리', '헤블데'],
      socials: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소'],
      support: '', // 소분류 지원
      sex: '', // 성별
      status: '', // 상태
      country: '', // 국적
      date: '', // 생년월일
      menu: '',
      menu2: '',
      filterdate: '', // 검색 날짜
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          position: 'top',
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '%';
            }
          }
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 320,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
    };
  },
  methods: {
    on () {

    },
    seyeon () {
      axios.get('/api/v1/visitlog')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          console.log('text');
        });
    }, // axios test 삭제해도 됨.
    submit () {

    }
  }
};
</script>

<style scoped>
  *{
    text-align: center;
  }
  .firstelement{
    margin-right: 10%;
    margin-left:10%;
    margin-bottom: 5%;
  }
  .another{
    margin-right: 10%;
    margin-left:10%;
    margin-bottom: 5%;
  }
  .buttonclass{
    margin-bottom: 5%;
    margin-top:1%
  }
  #filter{
    margin-top:1%;
    margin-bottom: 1%;
  }
  .test{
    margin-top: 1%;

  }
  .cardsize{
    width:170px;
    height:100px;
  }
</style>
