<template>
  <v-app id="main">
    <div class="top-padding"></div>
      <CardView>
        <v-card-title id="page-title">
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="2">
              <v-dialog ref="startdialog" v-model="startmodal" :return-value.sync="startDate" persistent width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="startDate" label="Start Date" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="startDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" v-on:click="startmodal = false">Cancel</v-btn>
                  <v-btn text color="primary" v-on:click="$refs.startdialog.save(startDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-dialog ref="enddialog" v-model="endmodal" :return-value.sync="endDate" persistent width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="endDate" label="End Date" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="endDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" v-on:click="endmodal = false">Cancel</v-btn>
                  <v-btn text color="primary" v-on:click="$refs.enddialog.save(endDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-btn small v-on:click="getStatisticData">search</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <lawchart type=donut class="donut-chart" :options="lawOptions" :series="lawSeries" />
            <medicalchart type=donut class="donut-chart" :options="medicalOptions" :series="medicalSeries" />
            <mentalchart type=donut class="donut-chart" :options="mentalOptions" :series="mentalSeries" />
            <socialchart type=donut class="donut-chart" :options="socialOptions" :series="socialSeries" />
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
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startmodal: false,
      endmodal: false,
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
        otherLaw: 0
      },
      medical: 0,
      mental: {
        intake: 0,
        psychology: 0,
        hebblede: 0
      },
      social: {
        koreanClass: 0,
        jobLinkage: 0,
        activities: 0,
        basic: 0,
        lodging: 0
      },
      lawSeries: [],
      lawOptions: {
        labels: ['인정 처우', '신청', '소송', '기타 법률'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '법률'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      medicalSeries: [],
      medicalOptions: {
        labels: ['의료'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '의료'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      mentalSeries: [],
      mentalOptions: {
        labels: ['인테이크', '심리', '헤블데'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '정신'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      socialSeries: [],
      socialOptions: {
        labels: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '사회'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
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
    makeUrl (url, params) {
      Object.keys(params).forEach(function (key, index) {
        url = url + (index === 0 ? '?' : '&') + key + '=' + params[key];
      });
      return url;
    },
    clearObjectData (object) {
      for (const n in object) {
        object[n] = 0;
      }
    },
    insertTableData (inputData) {
      for (let i = 0; i < inputData.length; i++) {
        const data = {};
        data.name = inputData[i].Refugee.name;
        data.birth = this.getDateFormat(new Date(inputData[i].Refugee.birth));
        data.nationality = inputData[i].Refugee.nationality;
        data.support = inputData[i].support;
        data.createdAt = this.getDateFormat(new Date(inputData[i].createdAt));
        this.tableData.push(data);
      }
    },
    insertChartData (inputData) {
      for (let i = 0; i < inputData.length; i++) {
        this.supportClassification(inputData[i]);
      }
      const lawList = [this.law.recognition, this.law.apply, this.law.lawsuit, this.law.otherLaw];
      const medicalList = [this.medical];
      const mentalList = [this.mental.intake, this.mental.psychology, this.mental.hebblede];
      const socialList = [this.social.koreanClass, this.social.jobLinkage, this.social.activities, this.social.basic, this.social.lodging];
      this.lawSeries = lawList;
      this.medicalSeries = medicalList;
      this.mentalSeries = mentalList;
      this.socialSeries = socialList;
    },
    supportClassification (visitlog) {
      if (visitlog.support_detail === '인정 처우') this.law.recognition += 1;
      else if (visitlog.support_detail === '신청') this.law.apply += 1;
      else if (visitlog.support_detail === '소송') this.law.lawsuit += 1;
      else if (visitlog.support_detail === '기타 법률') this.law.otherLaw += 1;
      else if (visitlog.support === '의료') this.medical += 1;
      else if (visitlog.support_detail === '인테이크') this.mental.intake += 1;
      else if (visitlog.support_detail === '심리') this.mental.psychology += 1;
      else if (visitlog.support_detail === '헤블데') this.mental.hebblede += 1;
      else if (visitlog.support_detail === '한국어 수업') this.social.koreanClass += 1;
      else if (visitlog.support_detail === '직업 연계') this.social.jobLinkage += 1;
      else if (visitlog.support_detail === '액티비티') this.social.activities += 1;
      else if (visitlog.support_detail === '기초') this.social.basic += 1;
      else this.social.lodging += 1;
    },
    async getStatisticData () {
      this.clearObjectData(this.law);
      this.clearObjectData(this.mental);
      this.clearObjectData(this.social);
      this.medical = 0;
      this.tableData = [];
      if (new Date(this.startDate) > new Date(this.endDate)) {
        alert('정확한 날짜를 입력하여 주세요');
      } else {
        let params = '';
        if (this.startDate === '' && this.endDate === '') {
          params = {};
        } else if (this.startDate !== '' && this.endDate === '') {
          params = { st_date: this.startDate };
        } else {
          params = { st_date: this.startDate, ed_date: this.endDate };
        }
        const url = this.makeUrl('api/v1/visitlog', params);
        const data = await this.getSelectedVisitlogData(url);
        console.log(data);
        this.insertTableData(data);
        this.insertChartData(data);
      }
    },
    async getSelectedVisitlogData (url) {
      const res = await axios.get(url);
      return res.data;
    }
  },
  async mounted () {
    await this.getStatisticData();
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
    width: 25%;
  }
  #main {
    width: 100%;
  }
  #page-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333333;
  }
  #card {
    width: 90%;
    height: 90%;
  }
  .top-padding {
    height: 3%;
  }
</style>
