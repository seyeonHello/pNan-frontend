<template>
  <v-card raised class="mx-auto text-center" width="95%" height="95%">
    <data-table
      class="refugee-table"
      :title="'난민 리스트'"
      :tableData="refugeeList"
      :tableHeaders="tableHeaders"
      ref="dataTable"
    >
      <!-- DataTable Overlay Slot --->
      <v-text-field class="text" label="이름" v-model="newRefugee.name"></v-text-field>
      <v-text-field label="국적" v-model="newRefugee.nationality"></v-text-field>
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
      <div class="btnclass">
        <v-btn dark color="primary" v-on:click="onClickSubmitBtn()">Create new Refugee</v-btn>
      </div>
      <!-- DataTable Overlay Slot Ends --->

    </data-table>
  </v-card>
</template>

<script>

import axios from 'axios';
import DataTable from '@/components/DataTable';

export default {
  name: 'showRefugee',
  components: {
    'data-table': DataTable
  },
  data () {
    return {
      refugeeList: [],
      statuslist: ['신청 전', '신청', '이의 신청', '1심', '2심', '3심', '재신청', '기타'],
      tableHeaders: [
        { text: '이름', align: 'left', value: 'name' },
        { text: '생년월일', align: 'left', value: 'birth' },
        { text: '국적', align: 'left', value: 'nationality' },
        { text: '등록일자', align: 'left', value: 'createdAt' },
        { text: '상태', align: 'left', value: 'status' },
        { text: 'Actions', align: 'left', value: 'action', sortable: false }
      ],
      tableValues: [],
      newRefugee: {
        id: '',
        name: '',
        birth: '',
        nationality: '',
        status: '',
        menu: ''
      }
    };
  },
  methods: {
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    getAllRefugee () {
      axios.get('/api/v1/refugee')
        .then((res) => {
          this.refugeeList = res.data;
          for (let i = 0; i < this.refugeeList.length; i++) {
            this.refugeeList[i].birth = this.getDateFormat(new Date(this.refugeeList[i].birth));
            this.refugeeList[i].createdAt = this.getDateFormat(new Date(this.refugeeList[i].createdAt));
          }
        })
        .catch(() => {
          alert('난민 정보를 불러오는 데에 실패했습니다.');
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
      } else {
        axios.post('/api/v1/refugee',
          { name: data.name, nationality: data.nationality, birth: new Date(data.birth), status: data.status })
          .then((res) => {
            this.$router.push('/showRefugee');
            alert('등록이 완료되었습니다.');
            this.$refs.dataTable.overlay = false;
            this.getAllRefugee();
            this.clearForm();
          })
          .catch(() => {
            alert('업로드에 실패했습니다.');
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
  }
};
</script>

<style scoped>
  *{
    text-align: center;
  }
  .refugee-table {
    width: 100%;
    height: 100%;
  }
</style>
