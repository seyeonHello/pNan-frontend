<template>
  <v-app style="background: #FFFF;">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <div>
      <v-data-table
        :headers="headers"
        :items="refugee"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      nan: [],
      headers: [
        {
          text: '이름',
          value: 'name'
        },
        { text: '국적', value: 'nation' },
        { text: '지원', value: 'support' },
        { text: 'start date', value: 'st_date' },
        { text: 'end date', value: 'ed_date' }
      ],
      refugee: []
    };
  },
  methods: {
    created () {
      axios.get('/api/v1/visitlog')
        .then((response) => {
          // console.log(response.data);
          this.nan = response.data;
          console.log(this.nan.length);
          var i = 0;
          for (i; i < this.nan.length; i++) {
            this.refugee.push({
              name: this.nan[i].Refugee.name,
              nation: this.nan[i].Refugee.nationality,
              support: this.nan[i].support,
              st_date: this.nan[i].createdAt,
              ed_date: this.nan[i].deletedAt
            });
          }
        });
    }
  },
  mounted () {
    this.created();
  }
};
</script>
