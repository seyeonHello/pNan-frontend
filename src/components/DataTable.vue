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
      :search="search"
      :options="pagination"
      :items="tableData"
      :server-items-length=count
      hide-default-footer
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
    <div id="pagination" class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
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
    tableHeaders: Array,
    count: Number
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
      ],
      offset: '',
      pagination: { page: 1 },
      length: ''
    };
  },
  watch: {
    pagination: {
      handler () {
        this.list();
      },
      deep: true
    }
  },
  methods: {
    list () {
      this.offset = this.setOffset;
      this.$emit('list', this.offset);
    },
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
    },
    setOffset () {
      if (this.pagination.page <= 0) return 0;
      return (this.pagination.page - 1) * 10;
    },
    pages () {
      if (this.count == null) { return 0; }
      return Math.ceil(this.count / 10);
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
  td {
    max-width: 300px;
  }
  #data-table-card {
    padding: 30px;
    box-sizing: border-box;
  }
  #data-table-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333333;
  }
  #data-table {
    overflow: scroll;
    height: 550px;
    max-height: 70%;
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
  #pagination {
    margin-top: 20px;
  }
</style>
