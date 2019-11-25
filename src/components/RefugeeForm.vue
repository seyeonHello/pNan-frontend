<template>
  <v-app style="background: #FFFF;">
    <v-row justify="center">
      <div id="enroll">
        <v-form id="enrollNan">
          <v-container>
            <v-layout column>
              <v-flex>
                <v-text-field label="이름" v-model="name"></v-text-field>
                <v-text-field label="국적" v-model="nationality"></v-text-field>
                <v-text-field label="생년월일(yyyy-mm-dd)" v-model="birth"></v-text-field>
                <v-textarea label="status" v-model="status"></v-textarea>
                <v-btn dark color="indigo" v-if="type" v-on:click="onClickSubmitBtn()">submit</v-btn>
                <v-btn dark color="indigo" v-else v-on:click="onClickUpdateBtn()">update</v-btn>
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
      id: '',
      name: '',
      birth: '',
      nationality: '',
      status: '',
      type: true
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
            this.$router.push('/showRefugee');
            alert('등록이 완료되었습니다.');
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    onClickUpdateBtn () {
      axios.put('http://pNan-backend-dev.ap-northeast-2.elasticbeanstalk.com/api/v1/refugee/' + this.id,
        { name: this.name, nationality: this.nationality, birth: new Date(this.birth), status: this.status })
        .then((res) => {
          alert('수정이 완료되었습니다.');
          this.$router.push('/showRefugee');
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted () {
    if (this.$route.params.type === 'update') {
      this.type = false;
      this.id = this.$route.params.refugee.id;
      console.log(this.id);
      this.name = this.$route.params.refugee.name;
      this.nationality = this.$route.params.refugee.nationality;
      this.birth = this.$route.params.refugee.birth;
      this.status = this.$route.params.refugee.status;
    } else {
      this.type = true;
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
