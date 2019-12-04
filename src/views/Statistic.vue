<template>
  <v-app id="main">
    <div class="top-padding"></div>
    <CardView>
      <v-card-text>
        <v-container fluid>
          <v-layout>
            <!-- search column -->
          </v-layout>
        </v-container>
        <div class="display-5 font-weight-thin">Todays</div>
      </v-card-text>
      <v-card-text>
        <v-container fluid>
          <lawchart type=radialBar height=350 :options="lawOptions" :series="lawSeries" class="donut-chart"/>
          <medicalchart type=radialBar height=350 :options="medicalOptions" :series="medicalSeries" class="donut-chart"/>
          <mentalchart type=radialBar height=350 :options="mentalOptions" :series="mentalSeries" class="donut-chart"/>
          <socialchart type=radialBar height=350 :options="socialOptions" :series="socialSeries" class="donut-chart"/>
        </v-container>
      </v-card-text>
      <v-card-text>
        <v-divider class="my-2"></v-divider>
        <v-data-table
          :headers="headers"
          :items="todayRegisteredRefugeeList"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </CardView>
  </v-app>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';
import CardView from '../components/CardView';

export default{
  name: 'Statistic',
  components: {
    CardView,
    lawchart: VueApexCharts,
    medicalchart: VueApexCharts,
    mentalchart: VueApexCharts,
    socialchart: VueApexCharts
  },
  data () {
    return {
      lawSeries: [76, 67, 61, 90],
      lawOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: '법률',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                }
              }
            }
          }
        },
        labels: ['인정 처우', '신청', '소송', '기타 법률']
      },
      medicalSeries: [25],
      medicalOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: '의료',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                }
              }
            }
          }
        },
        labels: ['의료']
      },
      mentalSeries: [76, 67, 61],
      mentalOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: '정신',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                }
              }
            }
          }
        },
        labels: ['인테이크', '심리', '헤블데']
      },
      socialSeries: [76, 67, 61, 90, 89],
      socialOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: '사회',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                }
              }
            }
          }
        },
        labels: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소']
      },
      // search Column
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
      filterdate: '' // 검색 날짜
    };
  },
  methods: {
    async getVisitLog () {
      const res = await axios.get('api/v1/visitlog?st_date=' + new Date('2019-01-01') + '&ed_date=' + new Date('2019-12-31'));
      console.log(res);
    }
  },
  mounted () {
    this.getVisitLog();
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
  .label{
    text-align: center;
    width: 20%;
    padding-left: 30%;
  }
  .donut-chart{
    float: left;
    width: 24%;
  }
   #main {
     width: 100%;
   }

  #card {
    width: 90%;
    height: 90%;
  }

  .top-padding {
    height: 3%;
  }
</style>
