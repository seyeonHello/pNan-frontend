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
          >
          <!-- DataTable Overlay Slot --->
          <template v-slot:show>
            <v-text-field label="이름" outlined v-model="newUser.name"></v-text-field>
            <v-text-field label="이메일" outlined v-model="newUser.email"></v-text-field>
            <v-text-field label="아이디" outlined v-model="newUser.id"></v-text-field>
            <v-text-field :type="'password'" label="비밀번호" outlined v-model="newUser.pw"></v-text-field>
            <v-text-field :type="'password'" label="비밀번호 확인" outlined v-model="newUser.pwCheck"></v-text-field>
            <v-btn dark color="primary" v-on:click="onClickSubmitBtn()">Create new User</v-btn>
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
        { text: '이름', align: 'left', value: 'name' },
        { text: '아이디', align: 'left', value: 'user_id' },
        { text: '이메일', align: 'left', value: 'email' },
        { text: '등록일', align: 'left', value: 'createdAt' },
        { text: 'Actions', align: 'left', value: 'action', sortable: false }
      ],
      newUser: {
        id: '',
        pw: '',
        pwCheck: '',
        name: '',
        email: ''
      },
      selected_user_id: ''
    }
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
      this.newUser = {
        id: '',
        name: '',
        pw: '',
        pwCheck: '',
        email: ''
      };
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
    getAllUser () {
      const ctx = this;
      ctx.tableData = [];
      axios.get('/api/v1/user')
        .then((res) => {
          res.data.forEach(function (rr, idx) {
            const data = {};
            data.name = rr.name;
            data.user_id = rr.user_id;
            data.email = rr.email;
            data.createdAt = ctx.getDateFormat(new Date(rr.createdAt));
            ctx.tableData.push(data);
          });
        }).catch(() => {
          alert('데이터를 불러오지 못했습니다!');
        });
    },
    onClickSubmitBtn () {
      const data = this.newUser;
      if (data.name === '') {
        alert('이름을 입력하세요');
      } else if (data.email === '') {
        alert('이메일을 입력하세요');
      } else if (data.id === '') {
        alert('아이디를 입력하세요');
      } else if (data.pw === '') {
        alert('비밀번호를 입력하세요');
      } else if (data.pwCheck === '' || data.pw != data.pwCheck) {
        alert('비밀번호를 확인하여 주세요');
      } else {
        axios.post('/api/v1/auth/signup',
          {
            name: data.name,
            email: data.email,
            id: data.id,
            pw: data.pw
          })
          .then((res) => {
            this.$router.push('/admin');
            alert('등록이 완료되었습니다.');
            this.$refs.dataTable.overlay = false;
            this.getAllUser();
            this.clearForm();
          })
          .catch(() => {
            alert('업로드에 실패했습니다.');
          });
      }
    },
    onClickDeleteBtn (item) {
      this.selected_user_id = item.user_id;
      axios.delete(`/api/v1/user/${this.selected_user_id}`)
        .then((res) => {
          this.$router.push('/admin');
          if (res.data.message) {
            alert(res.data.message);  
          }else {
            alert('삭제하였습니다.');
          }
          this.getAllUser();
        })
        .catch(() => {
          alert('삭제에 실패했습니다.');
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
