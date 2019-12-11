<template>
  <div id="data-table-card">
    <v-card-title id="data-table-title">
      {{title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn color="primary" id="btn-new" v-on:click="onClickNewBtn">New</v-btn>
      <v-autocomplete :items="refugeeNameList" label="이름 검색" v-model="search" class="text"></v-autocomplete>
      <v-btn text icon color="gray" v-on:click="clearSearch">
        <v-icon>mdi-replay</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      id="data-table"
      height="'100%'"
      :headers="tableHeaders"
      :items="tableData"
      :options="pagination"
      :server-items-length=count
      hide-default-footer
      :href="link">
      <template v-slot:item.action="{ item }">
        <v-btn v-if="isRefugeeTable" text icon color="gray" v-on:click="onClickMemoShowBtn(item)">
          <v-icon small>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn text icon color="gray" v-on:click="onClickEditBtn(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="isAdmin" text icon color="gray" v-on:click="onClickDeleteBtn(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template v-slot:header.name >
        <button @click="filter(filterHeader.name)">이름</button>
      </template>
      <template v-slot:header.sex >
        <button @click="filter(filterHeader.sex)">성별</button>
      </template>
      <template v-slot:header.birth >
        <button @click="filter(filterHeader.birth)">생년월일</button>
      </template>
      <template v-slot:header.nationality >
        <button @click="filter(filterHeader.nation)">국적</button>
      </template>
      <template v-slot:header.createdAt >
        <button @click="filter(filterHeader.createdAt)">등록 일자</button>
      </template>
      <template v-slot:header.reason >
        <button @click="filter(filterHeader.reason)">난민 사유</button>
      </template>
      <template v-slot:header.torture >
        <button @click="filter(filterHeader.torture)">고문 피해</button>
      </template>
      <template v-slot:header.status >
        <button @click="filter(filterHeader.status)">상태</button>
      </template>
      <template v-slot:header.support >
        <button @click="filter(filterHeader.support)">지원 종류</button>
      </template>
      <template v-slot:header.support_detail >
        <button @click="filter(filterHeader.support_detail)">상세 지원 종류</button>
      </template>
    </v-data-table>

    <v-overlay
      :absolute="absolute"
      :value="overlay">
      <Overlay v-on:close="onClickNewBtn">
        <slot name="show"></slot>
      </Overlay>
    </v-overlay>

    <v-overlay
      :absolute="absolute"
      :value="overlayMemo">
      <Overlay v-on:close="onClickMemoCloseBtn">
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
    count: Number,
    refugeeNameList: Array
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
      length: '',
      filterHeader: {
        name: 'name',
        sex: 'sex',
        birth: 'birth',
        nation: 'nationality',
        createdAt: 'createdAt',
        reason: 'reason',
        torture: 'torture',
        status: 'status',
        support: 'support',
        support_detail: 'support_detail'
      },
      filterKind: {
        name: '',
        sort: false
      }
    };
  },
  watch: {
    pagination: {
      handler () {
        this.pageOffset();
      },
      deep: true
    },
    'search' (newVal) {
      this.$emit('search', newVal);
    }
  },
  methods: {
    clearSearch () {
      this.search = '';
    },
    filter (name) {
      this.filterKind.name = name;
      this.$emit('filter', this.filterKind);
      this.filterKind.sort = !this.filterKind.sort;
    },
    pageOffset () {
      this.offset = this.setOffset;
      this.$emit('list', this.offset);
    },
    onClickMemoCloseBtn () {
      this.overlayMemo = false;
    },
    onClickMemoShowBtn (item) {
      this.$emit('detailRefugee', item);
      this.overlayMemo = !this.overlayMemo;
    },
    onClickDeleteBtn (item) {
      this.$emit('deleteItem', item);
    },
    onClickEditBtn (item) {
      this.overlay = !this.overlay;
      this.$emit('updateItem', item);
    },
    onClickNewBtn () {
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
    },
    isRefugeeTable () {
      return this.$route.path === '/showRefugee';
    }
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
  ::-webkit-scrollbar {
    display:none;
  }
  #pagination {
    margin-top: 20px;
  }
</style>
