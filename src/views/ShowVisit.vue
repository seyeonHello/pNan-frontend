<template>
  <v-card class="mycard">
    <v-card-title>
      Visit List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="refugee"
      :items-per-page="5"
      v-model="selected"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-btn small v-on:click="onClickDeleteBtn(item)" id="btndelete">삭제</v-btn>
        <v-btn small v-on:click="onClickUpdateBtn(item)">수정</v-btn>
      </template>
    </v-data-table>
  </v-card>
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
        { text: '방문 날짜', value: 'st_date' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      refugee: [],
      selected: [],
      search: ''
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
    onClickDeleteBtn (item) {
      console.log(item);
      axios.delete(`/api/v1/visitlog/${item.id}`)
        .then((res) => {
          console.log(item.id);
          alert('해당 정보가 삭제되었습니다.');
        })
        .catch(err => {
          console.log(err);
        });
      // console.log('delte');
    },
    onClickUpdateBtn (item) {
      this.$router.push({ name: 'UpdateVisit', params: { visit: item, type: 'update' } });
    },
    created () {
      axios.get('/api/v1/visitlog')
        .then((response) => {
          // console.log(response.data);
          this.nan = response.data;
          console.log(this.nan);
          var i = 0;
          for (i; i < this.nan.length; i++) {
            this.refugee.push({
              refugee_id: this.nan[i].Refugee.id,
              id: this.nan[i].id,
              name: this.nan[i].Refugee.name,
              nation: this.nan[i].Refugee.nationality,
              support: this.nan[i].support,
              st_date: this.getDateFormat(new Date(this.nan[i].createdAt))
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

<style>
  .mycard{
    max-width:95%;
  }
  #btndelete{
    margin-right: 5%;
  }
</style>
