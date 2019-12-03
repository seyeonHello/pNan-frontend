<template>
  <v-card class="data-table mx-auto text-center" max-width="100%" height="100%">
    <v-card-title class="data-table-title">
      {{title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="btn-new" v-on:click="onClickNewButton">New</v-btn>
      <v-text-field
        v-model="search"
        label="Search"
        outlined=""
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :height="'100%'"
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
      :items-per-page="10"
      :href="link">
    </v-data-table>
    <v-overlay
      :absolute="absolute"
      :value="overlay"
    >
      <Overlay v-on:close="onClickNewButton"
      >
        <slot></slot>
      </Overlay>
    </v-overlay>
  </v-card>
</template>

<script>
import Overlay from './Overlay';
export default {
  name: 'data-table',
  components: { Overlay },
  props: {
    title: String,
    tableData: Array,
    tableHeaders: Array
  },
  data () {
    return {
      absolute: false,
      overlay: false,
      link: '<button>링크</button>',
      search: '',
      headers: [
      ]
    };
  },
  methods: {
    onClickNewButton () {
      this.overlay = !this.overlay;
    }
  },
  mounted () {
    const table = [
      { text: '이름', align: 'left', value: 'name' },
      { text: '생년월일', align: 'left', value: 'birth' },
      { text: '국적', align: 'left', value: 'nationality' },
      { text: '등록일자', align: 'left', value: 'createdAt' },
      { text: '상태', align: 'left', value: 'status' },
      { text: 'Actions', align: 'left', value: 'action', sortable: false }
    ];
    this.headers = table;
  }
};
</script>

<style scoped>
  .btn-new {
    margin-right: 50px;
  }
  .data-table {
    padding: 20px;
  }
  .data-table-title {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
