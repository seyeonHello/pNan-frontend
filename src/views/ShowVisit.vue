<template>
  <v-app id="main">
    <div class="top-padding"></div>
    <CardView>
      <data-table
        class="refugee-table"
        ref="dataTable"
        :title="'방문 일지'"
        :tableData="tableData"
        :tableHeaders="tableHeaders"
        :count="count"
        :refugeeNameList="visitNameList"
        @deleteItem="onClickDeleteBtn"
        @updateItem="popUpdateModal"
        @close="close"
        @list="pageOffset"
        @filter="filter"
        @search="nameSearch"
      >
        <!-- DataTable Overlay Slot --->
        <template v-slot:show>
          <v-autocomplete :items="refugeeList" outlined label="이름" v-model="input.name" class="text"></v-autocomplete>
          <v-autocomplete :items="supportOptions" outlined label="지원 종류" v-model="newVisitLog.support" class="text"></v-autocomplete>
          <div v-if="newVisitLog.support === '법률'">
            <v-autocomplete :items="supports.laws" outlined label="법률 종류" v-model="newVisitLog.supportDetail"></v-autocomplete>
          </div>
          <div v-else-if="newVisitLog.support === '심리'">
            <v-autocomplete :items="supports.Psychology" outlined label="심리 종류" v-model="newVisitLog.supportDetail"></v-autocomplete>
          </div>
          <div v-else-if="newVisitLog.support === '사회'">
            <v-autocomplete :items="supports.socials" outlined label="사회 종류" v-model="newVisitLog.supportDetail"></v-autocomplete>
          </div>
          <div class="btnclass">
            <v-btn dark color="primary" v-if="type" v-on:click="onClickSubmitBtn()">Create new Visit Log</v-btn>
            <v-btn dark color="indigo" v-else v-on:click="onClickUpdateBtn()">Update Visit Log</v-btn>
          </div>
        </template>
        <!-- DataTable Overlay Slot Ends --->
      </data-table>
    </CardView>
  </v-app>
</template>

<script>

import axios from 'axios';
import DataTable from '@/components/DataTable';
import CardView from '../components/CardView';

export default {
  name: 'showRefugee',
  components: {
    CardView,
    'data-table': DataTable
  },
  data () {
    return {
      tableData: [],
      tableHeaders: [
        { text: '이름', align: 'left', value: 'name', sortable: false },
        { text: '생년월일', align: 'left', value: 'birth', sortable: false },
        { text: '국적', align: 'left', value: 'nationality', sortable: false },
        { text: '지원 종류', align: 'left', value: 'support', sortable: false },
        { text: '상세 지원 종류', align: 'left', value: 'support_detail', sortable: false },
        { text: '방문일', align: 'left', value: 'createdAt', sortable: false },
        { text: 'Actions', align: 'left', value: 'action', sortable: false }
      ],
      supportOptions: ['의료', '법률', '심리', '사회'],
      supports: {
        medical: [],
        laws: ['인정 처우', '신청', '소송', '기타 법률'],
        Psychology: ['인테이크', '심리', '헤블데'],
        socials: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소']
      },
      newVisitLog: {
        refugee_id: null,
        support: null,
        supportDetail: null
      },
      input: {
        name: null
      },
      refugeeList: [],
      refugeeID: '',
      visitLogID: '',
      type: true,
      count: 0,
      offset: 0,
      criteria: '',
      sort: '',
      searchName: '',
      visitNameList: []
    };
  },
  methods: {
    nameSearch (item) {
      this.offset = 0;
      this.searchName = item;
      this.getAllVisitLog();
    },
    filter (filterKind) {
      this.criteria = filterKind.name;
      if (filterKind.sort === true) {
        this.sort = 'ASC';
      }
      if (filterKind.sort === false) {
        this.sort = 'DESC';
      }
      this.getAllVisitLog();
    },
    pageOffset (offset) {
      this.offset = offset;
      this.getAllVisitLog();
    },
    close () {
      this.newVisitLog = {
        refugee_id: null,
        support: null
      };
      this.input = {
        name: null
      };
      this.type = true;
    },
    onClickDeleteBtn (item) {
      this.visitLogID = item.visit_id;
      axios.delete(`/api/v1/visitlog/${item.visit_id}`)
        .then(() => {
          alert('삭제가 완료 되었습니다.');
        })
        .catch(() => {
          alert('삭제가 실패 되었습니다.');
        })
        .finally(() => {
          this.getAllVisitLog();
          this.getVisitNameList();
        });
    },
    popUpdateModal (item) {
      this.type = false;
      this.visitLogID = item.visit_id;
      this.refugeeID = item.refugee_id;
      this.input.name = item.name;
      this.newVisitLog.support = item.support;
      this.newVisitLog.supportDetail = item.support_detail;
    },
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    getAllVisitLog () {
      const ctx = this;
      ctx.tableData = [];
      axios.get(`/api/v1/visitlog?offset=${this.offset}&criteria=${this.criteria}&order=${this.sort}&name=${this.searchName}`)
        .then((res) => {
          this.count = parseInt(res.data.count);
          res.data.rows.forEach(function (rr, idx) {
            const data = {};
            data.name = rr.Refugee.name;
            data.birth = ctx.getDateFormat(new Date(rr.Refugee.birth));
            data.nationality = rr.Refugee.nationality;
            data.support = rr.support;
            data.createdAt = ctx.getDateFormat(new Date(rr.createdAt));
            data.support_detail = rr.support_detail;
            data.memo = rr.Refugee.memo;
            data.refugee_id = rr.Refugee.id;
            data.visit_id = rr.id;
            ctx.tableData.push(data);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    async getRefugeeInfo (name) {
      const res = await axios.get('/api/v1/refugee?name=' + name);
      this.newVisitLog.refugee_id = res.data.rows[0].id;
    },
    getRefugeeNameList () {
      const ctx = this;
      axios.get('/api/v1/refugee')
        .then((res) => {
          res.data.rows.forEach(function (rr, idx) {
            ctx.refugeeList.push(rr.name);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    getVisitNameList () {
      const ctx = this;
      axios.get('/api/v1/visitlog')
        .then((res) => {
          res.data.rows.forEach(function (rr, idx) {
            ctx.visitNameList.push(rr.Refugee.name);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    onClickSubmitBtn () {
      if (this.input.name === null) {
        alert('이름을 입력하세요');
      } else if (this.newVisitLog.support === null) {
        alert('지원 종류를 입력하세요');
      } else if (!this.newVisitLog.supportDetail && this.newVisitLog.support !== '의료') {
        alert(`${this.newVisitLog.support} 종류를 입력하세요`);
      } else {
        axios.post('/api/v1/visitlog',
          {
            refugee_id: this.newVisitLog.refugee_id,
            support: this.newVisitLog.support,
            support_detail: this.newVisitLog.supportDetail
          })
          .then((res) => {
            alert('등록이 완료되었습니다.');
          })
          .catch(() => {
            alert('등록에 실패했습니다.');
          })
          .finally(() => {
            this.$refs.dataTable.overlay = false;
            this.newVisitLog = {
              refugee_id: null,
              support: null
            };
            this.input = {
              name: null
            };
            this.getAllVisitLog();
            this.getVisitNameList();
          });
      }
    },
    onClickUpdateBtn () {
      if (this.input.name === null) {
        alert('이름을 입력하세요');
      } else if (this.newVisitLog.support === null) {
        alert('지원 종류를 입력하세요');
      } else if (!this.newVisitLog.supportDetail && this.newVisitLog.support !== '의료') {
        alert(`${this.newVisitLog.support} 종류를 입력하세요`);
      } else {
        if (this.newVisitLog.support === '의료') {
          this.newVisitLog.supportDetail = null;
        }
        axios.put(`/api/v1/visitlog/${this.visitLogID}`,
          {
            refugee_id: this.newVisitLog.refugee_id,
            support: this.newVisitLog.support,
            support_detail: this.newVisitLog.supportDetail
          })
          .then(() => {
            alert('수정이 완료되었습니다.');
          })
          .catch(() => {
            alert('수정이 실패되었습니다.');
          })
          .finally(() => {
            this.$refs.dataTable.overlay = false;
            this.newVisitLog = {
              refugee_id: null,
              support: null
            };
            this.input = {
              name: null
            };
            this.getAllVisitLog();
            this.getVisitNameList();
            this.type = true;
          });
      }
    }
  },
  watch: {
    'input.name' (newVal) {
      this.getRefugeeInfo(newVal);
    }
  },
  mounted () {
    this.getAllVisitLog();
    this.getRefugeeNameList();
    this.getVisitNameList();
  }
};
</script>

<style scoped>
  #main {
    width: 100%;
  }

  .top-padding {
    height: 3%;
  }
</style>
