<template>
  <v-app id="main">
    <div class="top-padding"></div>
      <CardView>
        <data-table
            class="user-table"
            ref="dataTable"
            :title="'유저 정보'"
            :tableData="tableData"
            :tableHeaders="tableHeaders"
            @close="close"
            @deleteItem="onClickDeleteBtn"
            @updateItem="popUpdateModal"
          >
          <!-- DataTable Overlay Slot --->
          <template v-slot:show>
            <v-text-field v-if="!type" label="번호" outlined v-model="userForm.id" :disabled="true"></v-text-field>
            <v-text-field label="이름" outlined v-model="userForm.name"></v-text-field>
            <v-text-field label="이메일" outlined v-model="userForm.email"></v-text-field>
            <v-text-field label="아이디" outlined v-model="userForm.user_id"></v-text-field>
            <v-radio-group v-if="!type" label="유저 타입" v-model="userForm.admin">
              <v-radio label="관리자" :value="1">관리자</v-radio>
              <v-radio label="일반" :value="0">일반</v-radio>
            </v-radio-group>
            <v-text-field :type="'password'" v-if="!type" label="변경할 비밀번호" v-model="userForm.new_pw" outlined></v-text-field>
            <v-text-field :type="'password'" v-if="type" label="비밀번호" outlined v-model="userForm.pw"></v-text-field>
            <v-text-field :type="'password'" v-if="type" label="비밀번호 확인" outlined v-model="userForm.pwCheck"></v-text-field>
            <v-btn dark color="indigo" v-if="!type" v-on:click="onClickUpdateBtn()">Update User Info</v-btn>
            <v-btn dark color="primary" v-else v-on:click="onClickCreateBtn()">Create new User</v-btn>
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
  name: 'Admin',
  components: {
    CardView,
    'data-table': DataTable
  },
  data () {
    return {
      tableData: [],
      tableHeaders: [
        { text: '번호', align: 'left', value: 'id' },
        { text: '이름', align: 'left', value: 'name' },
        { text: '아이디', align: 'left', value: 'user_id' },
        { text: '이메일', align: 'left', value: 'email' },
        { text: '등록일', align: 'left', value: 'createdAt' },
        { text: '유저타입', align: 'left', value: 'admin' },
        { text: 'Actions', align: 'left', value: 'action', sortable: false }
      ],
      userForm: {
        id: '',
        user_id: '',
        pw: '',
        pwCheck: '',
        name: '',
        email: '',
        admin: ''
      },
      type: true,
      new_pw: ''
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
    clearForm () {
      this.userForm = {
        user_id: '',
        name: '',
        pw: '',
        pwCheck: '',
        email: ''
      };
    },
    close () {
      this.clearForm();
      this.type = true;
    },
    getAllUser () {
      const ctx = this;
      ctx.tableData = [];
      axios.get('/api/v1/user')
        .then((res) => {
          res.data.forEach(function (rr, idx) {
            const data = {};
            data.id = rr.id;
            data.name = rr.name;
            data.user_id = rr.user_id;
            data.email = rr.email;
            if (rr.admin) {
              data.admin = '관리자';
            } else {
              data.admin = '일반';
            }
            data.createdAt = ctx.getDateFormat(new Date(rr.createdAt));
            ctx.tableData.push(data);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    onClickCreateBtn () {
      const data = this.userForm;
      if (data.name === '') {
        alert('이름을 입력하세요');
      } else if (data.email === '') {
        alert('이메일을 입력하세요');
      } else if (data.user_id === '') {
        alert('아이디를 입력하세요');
      } else if (data.pw === '') {
        alert('비밀번호를 입력하세요');
      } else if (data.pwCheck === '' || data.pw !== data.pwCheck) {
        alert('비밀번호를 확인하여 주세요');
      } else {
        axios.post('/api/v1/auth/signup',
          {
            name: data.name,
            email: data.email,
            id: data.user_id,
            pw: data.pw
          })
          .then((res) => {
            alert('등록이 완료되었습니다.');
            this.$refs.dataTable.overlay = false;
            this.getAllUser();
            this.close();
          })
          .catch(() => {
            alert('업로드에 실패했습니다.');
          });
      }
    },
    popUpdateModal (item) {
      this.type = false;
      this.userForm.id = item.id;
      this.userForm.name = item.name;
      this.userForm.email = item.email;
      this.userForm.user_id = item.user_id;
      this.userForm.pw = item.pw;
      if (item.admin === '관리자') {
        this.userForm.admin = 1;
      } else {
        this.userForm.admin = 0;
      }
    },
    onClickDeleteBtn (item) {
      axios.delete(`/api/v1/user/${item.id}`)
        .then((res) => {
          this.$router.push('/admin');
          if (res.data.message) {
            alert(res.data.message);
          } else {
            alert('삭제가 완료되었습니다.');
          }
          this.getAllUser();
        })
        .catch(() => {
          alert('삭제에 실패했습니다.');
        });
    },
    onClickUpdateBtn () {
      const data = this.userForm;
      let params;
      if (data.new_pw) {
        params = {
          name: data.name,
          user_id: data.user_id,
          email: data.email,
          admin: data.admin
        };
      } else {
        params = {
          name: data.name,
          user_id: data.user_id,
          email: data.email,
          new_pw: data.new_pw,
          admin: data.admin
        };
      }
      axios.put(`api/v1/user/${data.id}`, params)
        .then((res) => {
          alert('변경이 완료되었습니다.');
          this.$refs.dataTable.overlay = false;
          this.close();
          this.getAllUser();
        })
        .catch(() => {
          alert('변경에 실패했습니다.');
        });
    }
  },
  mounted () {
    this.getAllUser();
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
