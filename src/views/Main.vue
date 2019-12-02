<template>
    <v-card class="mx-auto text-center" max-width="95%" height="100%">
        <v-card-text>
            <div class="display-5 font-weight-thin">Todays</div>
        </v-card-text>
        <v-card-text>
            <chart-line type=line height=350
                :weekendDate="weekendDate"
                :weekendRegistration="weekendRegistration"
                :weekendVisitation="weekendVisitation"/>
            <v-divider class="my-2"></v-divider>
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
            <v-data-table
                :headers="headers"
                :items="todayRegisteredRefugeeList"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';
import ChartLine from '@/components/Chart';

export default {
  name: 'Main',
  components: {
    'chart-line': ChartLine
  },
  data () {
    return {
      headers: [
        { text: '이름', value: 'name' },
        { text: '국적', value: 'nationality' },
        { text: '생년월일', value: 'birth' },
        { text: '등록일자', value: 'createdAt' },
        { text: '상태', value: 'status' }
      ],
      todayRegisteredRefugeeList: [], // Today's registrated refugee list
      todayVisitedRefugeelist: [], // Today's visited refugee list
      weekendDate: [], // Date list from 6 day's ago to Today
      weekendRegistration: [], // count of weekend registrated refugee
      weekendVisitation: [] // count of weekend visited refugee
    };
  },
  methods: {
    getWeekendDate () {
      var today = new Date();
      var theYear = today.getFullYear();
      var theMonth = today.getMonth();
      var theDate = today.getDate();
      var theDayOfWeek = today.getDay();
      var thisWeek = [];
      for (var i = 0; i < 7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (theDayOfWeek - (7 - i)));
        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth()) + 1;
        var dd = resultDay.getDate();
        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;
        thisWeek[i] = yyyy + '-' + mm + '-' + dd;
      }
      return thisWeek;
    },
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    getTodayRefugees (weekendDate) {
      axios.get('api/v1/refugee?st_date=' + weekendDate[0] + '&ed_date=' + weekendDate[6])
        .then((res) => {
          const list = res.data;
          const countMap = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };
          for (let i = 0; i < list.length; i++) {
            if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[0]) {
              countMap.one += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[1]) {
              countMap.two += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[2]) {
              countMap.three += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[3]) {
              countMap.four += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[4]) {
              countMap.five += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[5]) {
              countMap.six += 1;
            } else {
              countMap.seven += 1;
              list[i].birth = this.getDateFormat(new Date(list[i].birth));
              list[i].createdAt = this.getDateFormat(new Date(list[i].createdAt));
              this.todayRegisteredRefugeeList.push(list[i]);
            }
          }
          this.weekendRegistration.push(countMap.one, countMap.two, countMap.three, countMap.four, countMap.five, countMap.six, countMap.seven);
        });
    },
    getTodayVisitor (weekendDate) {
      axios.get('api/v1/visitlog?st_date=' + weekendDate[0] + '&ed_date=' + weekendDate[6])
        .then((res) => {
          const list = res.data;
          console.log(list);
          const countMap = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 };
          for (let i = 0; i < list.length; i++) {
            if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[0]) {
              countMap.one += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[1]) {
              countMap.two += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[2]) {
              countMap.three += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[3]) {
              countMap.four += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[4]) {
              countMap.five += 1;
            } else if (this.getDateFormat(new Date(list[i].createdAt)) === weekendDate[5]) {
              countMap.six += 1;
            } else {
              countMap.seven += 1;
              list[i].createdAt = this.getDateFormat(new Date(list[i].createdAt));
              this.todayVisitedRefugeelist.push(list[i]);
            }
          }
          this.weekendVisitation.push(countMap.one, countMap.two, countMap.three, countMap.four, countMap.five, countMap.six, countMap.seven);
        });
    }
  },
  mounted () {
    this.weekendDate = this.getWeekendDate();
    this.getTodayRefugees(this.weekendDate);
    this.getTodayVisitor(this.weekendDate);
  }
};
</script>

<style scoped>
</style>
