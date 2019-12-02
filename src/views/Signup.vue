<template>
  <v-app>
    <v-row justify="center">
      <div id="signup">
        <v-form id="signup2">
          <v-container>
            <h2>회원가입</h2>
            <v-layout column>
              <v-flex>
                <v-text-field label="이름" v-model="name"></v-text-field>
                <v-text-field label="생년월일" v-model="birth"></v-text-field>
                <v-text-field label="ID" v-model="id"></v-text-field>
                <v-text-field label="password" v-model="password"></v-text-field>
                <v-btn dark color="indigo darken-2" @click="submit">save</v-btn>
                <v-btn id="exitbtn" dark color="indigo darken-2" @click="exit">exit</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </div>
    </v-row>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signup',
  data () {
    return {
      name: '',
      id: '',
      password: '',
      birth: ''
    };
  },
  methods: {
    submit () {
      if (this.name && this.birth && this.id && this.password) {
        axios.post('/api/v1/auth/join', { id: this.id, pw: this.pw, name: this.name, birth: this.birth })
          .then(() => {
            alert('회원가입이 완료되었습니다.');
          })
          .catch(() => {
            alert('회원가입에 실패하였습니다.');
          });
      } else {
        alert('모든 항목을 작성하여 주세요.');
      };
    },
    exit () {
    }
  }
};
</script>

<style scoped>
  *{
    text-align: center;
  }
  #signup{
    position: absolute;
    text-align: center;
    vertical-align: center;
    horiz-align: center;
    width:500px;
    margin:auto;
  }
  #exitbtn{
    margin-left: 20px;
  }
</style>
