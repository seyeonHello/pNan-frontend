<template>
  <div id="chart">
    <apexchart type=line height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
/* eslint-disable */
export default {
  name: 'chart-line',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    weekendRegistration: {
      type: Array,
      required: true
    },
    weekendVisitation: {
      type: Array
    },
    weekendDate: {
      type: Array
    }
  },
  data () {
    return {
      componentKey: 0,
      series: [
        {
          name: 'Registration',
          data: []
        },
        {
          name: 'Visitation',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'WEEKEND',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Count'
          },
          min: 0,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }
    }
  }, 
  methods: {
    deleteYear (date) {
      date = String(date);
      var dateArray = date.split('-');
      return dateArray[1] + '-' + dateArray[2];   
    },
    renderRegistration () {
      this.chartOptions.xaxis.categories = this.weekendDate;
      this.series[0].data = this.weekendRegistration;
    },
    renderVisitation () {
      this.series[1].data = this.weekendVisitation;
    }
  },
  created() {
    this.renderRegistration();
    this.renderVisitation();
  }
}
</script>
