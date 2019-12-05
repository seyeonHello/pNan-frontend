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
        @detailRefugee="detailRefugee"
        @deleteItem="deleteItem"
        @updateItem="updateItem"
        @close="close"
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
        <!-- DataTable Overlay Slot --->
        <template v-slot:refugeeMemo>
          <v-icon>mdi-account</v-icon>
          <h4>"{{refugeeName}}"님의 정보</h4>
          <v-textarea
            background-color="grey lighten-3"
            color="black"
            v-model="refugeeDetail"
          ></v-textarea>
          <v-btn color="blue darken-1" text v-on:click="save(refugeeDetail)">save</v-btn>
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
        { text: '이름', align: 'left', value: 'name' },
        { text: '생년월일', align: 'left', value: 'birth' },
        { text: '국적', align: 'left', value: 'nationality' },
        { text: '지원 종류', align: 'left', value: 'support' },
        { text: '상세 지원 종류', align: 'left', value: 'support_detail' },
        { text: '방문일', align: 'left', value: 'createdAt' },
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
      refugeeName: '',
      refugeeDetail: '',
      refugeeID: '',
      visitLogID: '',
      type: true
    };
  },
  methods: {
    close () {
      this.newVisitLog = {
        refugee_id: null,
        support: null
      };
      this.input = {
        name: null
      };
    },
    save () {
      axios.put(`/api/v1/refugee/${this.refugeeID}`,
        { memo: this.refugeeDetail })
        .then(() => {
          alert('수정이 완료 되었습니다.');
        })
        .catch(() => {
          alert('수정이 실패 되었습니다.');
        })
        .finally(() => {
          this.$refs.dataTable.overlayMemo = false;
        });
    },
    deleteItem (item) {
      this.visitLogID = item.visit_id;
      axios.delete(`/api/v1/visitlog/${this.visitLogID}`)
        .then(() => {
          alert('삭제가 완료 되었습니다.');
        })
        .catch(() => {
          alert('삭제가 실패 되었습니다.');
        })
        .finally(() => {
          this.getAllVisitLog();
        });
    },
    updateItem (item) {
      this.type = false;
      this.visitLogID = item.visit_id;
      this.refugeeID = item.refugee_id;
      this.input.name = item.name;
      this.newVisitLog.support = item.support;
      this.newVisitLog.supportDetail = item.support_detail;
    },
    detailRefugee (item) {
      this.refugeeID = item.refugee_id;
      axios.get(`/api/v1/refugee/${item.refugee_id}`)
        .then((res) => {
          this.refugeeDetail = res.data.memo;
          this.refugeeName = res.data.name;
        });
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
      axios.get('/api/v1/visitlog')
        .then((res) => {
          res.data.forEach(function (rr, idx) {
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
      this.newVisitLog.refugee_id = res.data[0].id;
    },
    getRefugeeNameList () {
      const ctx = this;
      axios.get('/api/v1/refugee')
        .then((res) => {
          res.data.forEach(function (rr, idx) {
            ctx.refugeeList.push(rr.name);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    onClickSubmitBtn () {
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
        });
    },
    onClickUpdateBtn () {
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
        });
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
  }
};
</script>

<style scoped>
  #main {
    width: 100%;
  }

  #card {
    width: 90%;
    height: 90%;
  }

  .top-padding {
    height: 3%;
  }
</style>
