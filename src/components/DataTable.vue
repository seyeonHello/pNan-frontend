<template>
  <v-card class="mx-auto text-center" max-width="100%" height="100%" id="data-table">
    <v-card-title id="data-table-title">
      {{title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn color="primary" id="btn-new" v-on:click="onClickNewButton">New</v-btn>
      <v-text-field
        v-model="search"
        label="Search"
        outlined=""
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      class="data-table"
      height="'100%'"
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
      :items-per-page="10"
      :href="link">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              {{myname}}의 정보입니다.
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn text icon color="gray" v-on:click="moreItem(item)">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
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
      dialog: false,
      absolute: false,
      overlay: false,
      link: '<button>링크</button>',
      search: '',
      headers: [
      ]
    };
  },
  methods: {
    close () {
      this.dialog = false;
    },
    moreItem (item) {
      this.dialog = true;
      this.myname = item.name;
    },
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
  #data-table {
    padding: 30px;
    overflow: scroll;
    box-sizing: border-box;
  }
  #data-table-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333333;
  }
  #btn-new {
    margin-right: 1%;
  }
</style>
