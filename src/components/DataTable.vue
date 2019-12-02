<template>
  <v-card class="mycard">
    <v-card-title>
      Refugee List
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
      :items="refugeeList"
      :search="search"
      :items-per-page="5"
      :href="link">
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'data-table',
  props: {
    refugeeList: {
      type: Array
    },
    tableHeaders: {
      type: Array
    },
    tableValues: {
      type: Array
    }
  },
  data () {
    return {
      link: '<button>링크</button>',
      search: '',
      headers: [
      ]
    };
  },
  methods: {
    setTable (header, value) {
      const table = [];
      for (let i = 0; i < header.length; i++) {
        const row = { text: header[i], align: 'left', value: value[i] };
        table.push(row);
      }
      return table;
    }
  },
  mounted () {
    const table = [
      { text: '이름', align: 'left', value: 'name' },
      { text: '생년월일', align: 'left', value: 'birth' },
      { text: '국적', align: 'left', value: 'nationality' },
      { text: '등록일자', align: 'left', value: 'createdAt' },
      { text: '상태', align: 'left', value: 'status' }
    ];
    this.headers = table;
  }
};
</script>

<style>
  .mycard{
    max-width:95%;
  }
</style>
