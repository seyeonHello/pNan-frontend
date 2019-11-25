<template>
  <v-app style="background: #FFFF;">
    <v-row justify="center">
      <div id="enroll">
        <v-form id="enrollNan">
          <v-container>
            <h2>난민 등록</h2>
            <v-layout column>
              <v-flex>
                <v-text-field label="이름" v-model="name"></v-text-field>
                <v-text-field label="국적" v-model="nationality"></v-text-field>
                <v-text-field label="생년월일(yyyy-mm-dd)" v-model="birth"></v-text-field>
                <v-textarea label="status" v-model="status"></v-textarea>
                <v-btn dark color="indigo" v-on:click="onClickSubmitBtn()">submit</v-btn>
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
  name: 'enrollNan',
  data () {
    return {
      name: '',
      birth: '',
      nationality: '',
      status: ''
    };
  },
  methods: {
    onClickSubmitBtn () {
      if (this.name === '') {
        alert('이름을 입력하세요');
      } else if (this.nationality === '') {
        alert('국적을 입력하세요');
      } else if (this.birth === '') {
        alert('생년월일을 입력하세요');
      } else if (this.status === '') {
        alert('상태를 입력하세요');
      } else {
        axios.post('http://pNan-backend-dev.ap-northeast-2.elasticbeanstalk.com/api/v1/refugee',
          { name: this.name, nationality: this.nationality, birth: new Date(this.birth), status: this.status })
          .then((res) => {
            console.log(res);
            alert('등록이 완료되었습니다.');
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
  *{
    text-align: center;
  }

  #enroll{
    position: absolute;
    text-align: center;
    vertical-align: center;
    horiz-align: center;
    width:500px;
    margin:auto;
  }
</style>
