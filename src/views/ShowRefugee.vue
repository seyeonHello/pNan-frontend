<template>
  <v-app id="main">
    <div class="top-padding"></div>
    <CardView>
      <data-table
        :title="'난민 리스트'"
        :tableData="refugeeList"
        :tableHeaders="tableHeaders"
        :count="count"
        :refugeeNameList="refugeeNameList"
        ref="dataTable"
        @detailRefugee="detailRefugee"
        @deleteItem="deleteItem"
        @updateItem="updateItem"
        @close="close"
        @list="pageOffset"
        @filter="filter"
        @search="search"
      >
        <!-- DataTable Overlay Slot --->
        <template v-slot:show>
          <v-text-field label="이름" outlined v-model="newRefugee.name"></v-text-field>
          <v-autocomplete :items="nationality" outlined label="국적" v-model="newRefugee.nationality"></v-autocomplete>
          <v-autocomplete :items="reasonList" outlined label="난민 사유" v-model="newRefugee.reason"></v-autocomplete>
          <v-radio-group label="성별" v-model="newRefugee.sex">
            <v-radio label="남자" value="M"></v-radio>
            <v-radio label="여자" value="F"></v-radio>
          </v-radio-group>
          <v-radio-group label="고문 피해 여부" v-model="newRefugee.torture">
            <v-radio label="Yes" :value="1"></v-radio>
            <v-radio label="No" :value="0"></v-radio>
          </v-radio-group>

          <v-menu
            :close-on-content-click="false"
            ref="menu"
            v-model="newRefugee.menu"
            :return-value.sync="newRefugee.birth"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="newRefugee.birth"
                label="생년월일"
                outlined
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newRefugee.birth" no-title scrollable>
              <v-btn text color="indigo" @click="newRefugee.menu = false">취소</v-btn>
              <v-btn text color="indigo" @click="$refs.menu.save(newRefugee.birth)">확인</v-btn>
            </v-date-picker>
          </v-menu>
          <v-autocomplete :items="statuslist" label="status" v-model="newRefugee.status"></v-autocomplete>
          <v-textarea
            outlined
            label="난민 메모"
            v-model="newRefugee.memo"
          ></v-textarea>
          <div class="btnclass">
            <v-btn dark color="primary" v-if="type" v-on:click="onClickSubmitBtn()">Create new Refugee</v-btn>
            <v-btn dark color="indigo" v-else v-on:click="onClickUpdateBtn()">Update Refugee</v-btn>
          </div>
        </template>
        <!-- DataTable Overlay Slot Ends --->
        <!-- DataTable Overlay Slot --->
        <template v-slot:refugeeMemo>
          <v-icon id="account">mdi-account</v-icon>
          <h4>"{{refugeeName}}"님의 정보</h4>
          <v-textarea
            background-color="grey lighten-3"
            color="black"
            v-model="refugeeDetail"
            rows="10"
          ></v-textarea>
          <v-btn color="blue darken-1" text v-on:click="memoSave(refugeeDetail)">save</v-btn>
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
      refugeeList: [],
      statuslist: ['신청 전', '신청', '이의 신청', '1심', '2심', '3심', '재신청', '기타'],
      reasonList: ['인종', '종교', '국적', '특정 사회 집단 구성원', '정치적 의견', '기타'],
      nationality: [],
      sexList: ['남자', '여자'],
      tableHeaders: [
        { text: '이름', align: 'left', value: 'name', sortable: false },
        { text: '성별', align: 'left', value: 'sex', sortable: false },
        { text: '생년월일', align: 'left', value: 'birth', sortable: false },
        { text: '국적', align: 'left', value: 'nationality', sortable: false },
        { text: '등록 일자', align: 'left', value: 'createdAt', sortable: false },
        { text: '난민 사유', align: 'left', value: 'reason', sortable: false },
        { text: '고문 피해', align: 'left', value: 'torture', sortable: false },
        { text: '상태', align: 'left', value: 'status', sortable: false },
        { text: 'Actions', align: 'left', value: 'action', sortable: false }
      ],
      tableValues: [],
      newRefugee: {
        id: '',
        name: '',
        birth: '',
        nationality: '',
        status: '',
        sex: '',
        torture: '',
        reason: '',
        memo: '',
        menu: ''
      },
      refugeeName: '',
      refugeeDetail: '',
      refugeeID: '',
      type: true,
      offset: 0,
      count: 0,
      criteria: 'updatedAt',
      sort: 'DESC',
      refugeeNameList: [],
      searchName: ''
    };
  },
  methods: {
    search (item) {
      this.searchName = item;
      this.getAllRefugee();
    },
    pageOffset (offset) {
      this.offset = offset;
      this.getAllRefugee();
    },
    filter (filterKind) {
      this.criteria = filterKind.name;
      if (filterKind.sort === true) {
        this.sort = 'ASC';
      }
      if (filterKind.sort === false) {
        this.sort = 'DESC';
      }
      this.getAllRefugee();
    },
    close () {
      this.clearForm();
      this.type = true;
    },
    memoSave () {
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
          this.getAllRefugee();
        });
    },
    detailRefugee (item) {
      this.refugeeID = item.id;
      axios.get(`/api/v1/refugee/${item.id}`)
        .then((res) => {
          this.refugeeDetail = res.data.memo;
          this.refugeeName = res.data.name;
        })
        .catch(() => {
          alert('데이터 불러오기 실패');
        });
    },
    deleteItem (item) {
      this.refugeeID = item.id;
      axios.delete(`/api/v1/refugee/${this.refugeeID}`)
        .then(() => {
          alert('삭제가 완료 되었습니다.');
        })
        .catch(() => {
          alert('삭제가 실패 되었습니다.');
        })
        .finally(() => {
          this.getAllRefugee();
          this.getRefugeeNameList();
        });
    },
    updateItem (item) {
      this.type = false;
      this.refugeeID = item.id;
      this.newRefugee.name = item.name;
      this.newRefugee.nationality = item.nationality;
      this.newRefugee.reason = item.reason;
      this.newRefugee.sex = item.sex;
      if (item.torture) {
        this.newRefugee.torture = 1;
      } else {
        this.newRefugee.torture = 0;
      }
      this.newRefugee.birth = item.birth;
      this.newRefugee.status = item.status;
      this.newRefugee.memo = item.memo;
    },
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    getCountryName () {
      const ctx = this;
      axios.get('/api/v1/stat/country')
        .then((res) => {
          res.data.forEach(function (rr, idx) {
            ctx.nationality.push(rr.name_kor);
          });
        })
        .catch(() => {
          alert('국가 정보를 불러오는 대에 실패했습니다');
        });
    },
    getAllRefugee () {
      axios.get(`/api/v1/refugee?offset=${this.offset}&criteria=${this.criteria}&order=${this.sort}&name=${this.searchName}`)
        .then((res) => {
          this.count = parseInt(res.data.count);
          this.refugeeList = res.data.rows;
          for (let i = 0; i < this.refugeeList.length; i++) {
            this.refugeeList[i].birth = this.getDateFormat(new Date(this.refugeeList[i].birth));
            this.refugeeList[i].createdAt = this.getDateFormat(new Date(this.refugeeList[i].createdAt));
            if (this.refugeeList[i].torture) {
              this.refugeeList[i].torture = 'YES';
            } else {
              this.refugeeList[i].torture = 'NO';
            }
          }
        })
        .catch(() => {
          alert('난민 정보를 불러오는 데에 실패했습니다.');
        });
    },
    getRefugeeNameList () {
      const ctx = this;
      axios.get('/api/v1/refugee')
        .then((res) => {
          res.data.rows.forEach(function (rr, idx) {
            ctx.refugeeNameList.push(rr.name);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    onClickSubmitBtn () {
      const data = this.newRefugee;
      if (data.name === '') {
        alert('이름을 입력하세요');
      } else if (data.nationality === '') {
        alert('국적을 입력하세요');
      } else if (data.birth === '') {
        alert('생년월일을 입력하세요');
      } else if (data.status === '') {
        alert('상태를 입력하세요');
      } else if (data.sex === '') {
        alert('성별을 입력하세요');
      } else if (data.reason === '') {
        alert('난민 사유를 입력하세요');
      } else if (data.torture === '') {
        alert('고문 피해 여부를 입력하세요');
      } else {
        axios.post('/api/v1/refugee',
          {
            name: data.name,
            nationality: data.nationality,
            birth: new Date(data.birth),
            status: data.status,
            sex: data.sex,
            torture: data.torture,
            reason: data.reason,
            memo: data.memo
          })
          .then((res) => {
            this.$router.push('/showRefugee');
            alert('등록이 완료되었습니다.');
            this.$refs.dataTable.overlay = false;
            this.getAllRefugee();
            this.clearForm();
            this.getRefugeeNameList();
          })
          .catch(() => {
            alert('업로드에 실패했습니다.');
          });
      }
    },
    onClickUpdateBtn () {
      const data = this.newRefugee;
      if (data.name === '') {
        alert('이름을 입력하세요');
      } else if (data.nationality === '') {
        alert('국적을 입력하세요');
      } else if (data.birth === '') {
        alert('생년월일을 입력하세요');
      } else if (data.status === '') {
        alert('상태를 입력하세요');
      } else if (data.sex === '') {
        alert('성별을 입력하세요');
      } else if (data.reason === '') {
        alert('난민 사유를 입력하세요');
      } else if (data.torture === '') {
        alert('고문 피해 여부를 입력하세요');
      } else {
        axios.put(`/api/v1/refugee/${this.refugeeID}`,
          {
            name: data.name,
            nationality: data.nationality,
            birth: new Date(data.birth),
            status: data.status,
            sex: data.sex,
            torture: data.torture,
            reason: data.reason,
            memo: data.memo
          })
          .then(() => {
            alert('수정이 완료되었습니다.');
          })
          .catch(() => {
            alert('수정이 실패되었습니다.');
          })
          .finally(() => {
            this.$refs.dataTable.overlay = false;
            this.getAllRefugee();
            this.clearForm();
            this.getRefugeeNameList();
            this.type = true;
          });
      }
    },
    clearForm () {
      this.newRefugee = {
        id: '',
        name: '',
        birth: '',
        nationality: '',
        status: '',
        menu: ''
      };
    }
  },
  mounted () {
    this.getAllRefugee();
    this.getCountryName();
    this.getRefugeeNameList();
  }
};
</script>

<style scoped>
  #main {
    width: 100%;
    box-sizing: border-box;
  }

  .top-padding {
    height: 3%;
  }

  #account{
    color: dodgerblue;
  }
</style>
