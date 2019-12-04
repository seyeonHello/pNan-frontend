<template>
  <v-card raised class="mx-auto text-center" width="95%" height="95%">
    <v-card-text>
    </v-card-text>
    <!-- chart -->
    <v-card-text>
      <v-container fluid>
        <lawchart ref="chart" type=radialBar height=350 :options="lawOptions" :series="lawSeries" class="donut-chart" />
        <medicalchart ref="chart" type=radialBar height=350 :options="medicalOptions" :series="medicalSeries" class="donut-chart"/>
        <mentalchart ref="chart" type=radialBar height=350 :options="mentalOptions" :series="mentalSeries" class="donut-chart"/>
        <socialchart ref="chart" type=radialBar height=350 :options="socialOptions" :series="socialSeries" class="donut-chart"/>
      </v-container>
    </v-card-text>
    <v-card-text>
      <v-divider class="my-2"></v-divider>
      <!-- table -->
      <v-data-table
        :headers="tableHeaders"
        :items="tableData"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';

export default{
  name: 'Statistic',
  components: {
    lawchart: VueApexCharts,
    medicalchart: VueApexCharts,
    mentalchart: VueApexCharts,
    socialchart: VueApexCharts
  },
  data () {
    return {
      tableData: [],
      tableHeaders: [
        { text: '이름', align: 'left', value: 'name' },
        { text: '생년월일', align: 'left', value: 'birth' },
        { text: '국적', align: 'left', value: 'nationality' },
        { text: '지원 종류', align: 'left', value: 'support' },
        { text: '방문일', align: 'left', value: 'createdAt' }
      ],
      law: {
        recognition: 0,
        apply: 0,
        lawsuit: 0,
        otherLaw: 0,
        totalCount: 10
      },
      medical: 0,
      mental: {
        intake: 0,
        psychology: 0,
        hebblede: 0,
        totalCount: 0
      },
      social: {
        koreanClass: 0,
        jobLinkage: 0,
        activities: 0,
        basic: 0,
        lodging: 0,
        totalCount: 0
      },
      lawSeries: [],
      lawOptions: {
        plotOptions: {
          radialBar: {
            offsetX: 0,
            offsetY: 0,
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px',
                formatter: function (val) {
                  return val + '건';
                }
              },
              total: {
                show: true,
                label: '법률',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                }
              }
            }
          }
        },
        labels: ['인정 처우', '신청', '소송', '기타 법률']
      },
      medicalSeries: [],
      medicalOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px',
                formatter: function (val) {
                  return val + '건';
                }
              },
              total: {
                show: true,
                label: '의료',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                }
              }
            }
          }
        },
        labels: ['의료']
      },
      mentalSeries: [],
      mentalOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px',
                formatter: function (val) {
                  return val + '건';
                }
              },
              total: {
                show: true,
                label: '정신',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                }
              }
            }
          }
        },
        labels: ['인테이크', '심리', '헤블데']
      },
      socialSeries: [],
      socialOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px',
                formatter: function (val) {
                  return val + '건';
                }
              },
              total: {
                show: true,
                label: '사회',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
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
      startDate: '',
      endDate: '',
      filterdate: '' // 검색 날짜
    };
  },
  methods: {
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    supportClassification (visitlog) {
      if (visitlog.support === '법률 인정 처우') this.law.recognition += 1;
      else if (visitlog.support === '법률 신청') this.law.apply += 1;
      else if (visitlog.support === '법률 소송') this.law.lawsuit += 1;
      else if (visitlog.support === '법률 기타 법률') this.law.otherLaw += 1;
      else if (visitlog.support === '의료') this.medical += 1;
      else if (visitlog.support === '정신 인테이크') this.mental.intake += 1;
      else if (visitlog.support === '정신 심리') this.mental.psychology += 1;
      else if (visitlog.support === '정신 헤블데') this.mental.hebblede += 1;
      else if (visitlog.support === '사회 한국어 수업') this.social.koreanClass += 1;
      else if (visitlog.support === '사회 직업 연계') this.social.jobLinkage += 1;
      else if (visitlog.support === '사회 액티비티') this.social.activities += 1;
      else if (visitlog.support === '사회 기초') this.social.basic += 1;
      else this.social.lodging += 1;
    },
    async getLawCount () {
      const res = await axios.get('api/v1/visitlog?support="법률"&support_detail="기타 법률"&st_date=2019-01-01&ed_date=2019-12-31');
      console.log(res);
    },
    async getVisitLog () {
      this.tableData = [];
      const res = await axios.get('api/v1/visitlog?st_date=' + new Date('2019-01-01') + '&ed_date=' + new Date('2019-12-31'));
      for (let i = 0; i < res.data.length; i++) {
        this.supportClassification(res.data[i]);
        const data = {};
        data.name = res.data[i].Refugee.name;
        data.birth = this.getDateFormat(new Date(res.data[i].Refugee.birth));
        data.nationality = res.data[i].Refugee.nationality;
        data.support = res.data[i].support;
        data.createdAt = this.getDateFormat(new Date(res.data[i].createdAt));
        this.tableData.push(data);
      }
      const lawList = [this.law.recognition, this.law.apply, this.law.lawsuit, this.law.otherLaw];
      const medicalList = [this.medical];
      const mentalList = [this.mental.intake, this.mental.psychology, this.mental.hebblede];
      const socialList = [this.social.koreanClass, this.social.jobLinkage, this.social.activities, this.social.basic, this.social.lodging];
      this.lawSeries = lawList;
      this.medicalSeries = medicalList;
      this.mentalSeries = mentalList;
      this.socialSeries = socialList;
    }
  },
  async mounted () {
    this.getLawCount();
    await this.getVisitLog();
    this.$refs.chart.refresh();
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
