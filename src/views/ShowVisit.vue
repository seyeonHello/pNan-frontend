<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <div id="textbox">
      <v-text-field
        label="search"
        outlined
        v-model="search"
      ></v-text-field>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="refugee"
        :items-per-page="5"
        v-model="selected"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn small v-on:click="onClickDeleteBtn(item)">삭제</v-btn>
          <v-btn small v-on:click="onClickUpdateBtn(item)">수정</v-btn>
        </template>
      </v-data-table>
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
        { text: '방문 날짜', value: 'st_date' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      refugee: [],
      selected: [],
      search: ''
    };
  },
  methods: {
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
              st_date: this.nan[i].createdAt
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
  #textbox{
    margin-bottom: 2%;
    width:250px;
  }
</style>
