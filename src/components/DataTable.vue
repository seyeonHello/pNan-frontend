<template>
  <div id="data-table-card">
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
      id="data-table"
      height="'100%'"
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
      :items-per-page="10"
      :href="link">
      <template v-slot:item.action="{ item }">
        <v-btn text icon color="gray" v-on:click="detailRefugee(item)">
          <v-icon small>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn text icon color="gray" v-on:click="editItem(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="isAdmin" text icon color="gray" v-on:click="deleteItem(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-overlay
      :absolute="absolute"
      :value="overlay">
      <Overlay v-on:close="onClickNewButton">
        <slot name="show"></slot>
      </Overlay>
    </v-overlay>

    <v-overlay
      :absolute="absolute"
      :value="overlayMemo">
      <Overlay v-on:close="close">
        <slot name="refugeeMemo"></slot>
      </Overlay>
    </v-overlay>
  </div>
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
      overlayMemo: false,
      refugeeName: '',
      refugeeDetail: '',
      link: '<button>링크</button>',
      search: '',
      headers: [
      ]
    };
  },
  methods: {
    close () {
      this.overlayMemo = false;
    },
    detailRefugee (item) {
      this.$emit('detailRefugee', item);
      this.overlayMemo = !this.overlayMemo;
    },
    deleteItem (item) {
      this.$emit('deleteItem', item);
    },
    editItem (item) {
      this.overlay = !this.overlay;
      this.$emit('updateItem', item);
    },
    onClickNewButton () {
      this.overlay = !this.overlay;
      this.$emit('close');
    }
  },
  computed: {
    isAdmin () {
      return this.$store.getters.getIsAdmin;
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

<style>
  #data-table-card {
    padding: 30px;
    max-height: 900px;
    box-sizing: border-box;
  }
  #data-table-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333333;
  }
  #data-table {
    overflow: scroll;
    max-height: 600px;
  }
  #btn-new {
    margin-right: 1%;
  }

  #main-data-table {
    overflow: scroll;
    max-height: 347px;
  }

  ::-webkit-scrollbar {
    display:none;
  }
</style>
