<template>
  <v-app style="background: #FFFF;">
          <v-container fluid>
            <v-layout>
            <v-flex xs12 sm3>
              <div class="another2">
                <v-text-field label="이름" v-model="name"></v-text-field>
              </div>
            </v-flex>
            <v-flex xs12 sm3>
              <div class="another2">
              <v-text-field label="국적" v-model="nationality"></v-text-field>
              </div>
            </v-flex>
            <v-flex xs12 sm3>
                <div class="another2">
                  <v-menu
                    :close-on-content-click="false"
                    ref="menu"
                    v-model="menu"
                    :return-value.sync="birth"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="birth"
                        label="생년월일"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="birth" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="indigo" @click="menu = false">취소</v-btn>
                      <v-btn text color="indigo" @click="$refs.menu.save(birth)">확인</v-btn>
                    </v-date-picker>
                  </v-menu>
                </div>
            </v-flex>
            <v-flex xs12 sm3>
              <div class="another">
                <v-textarea label="status" v-model="status"></v-textarea>
              </div>
            </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <div class="btnclass">
                  <v-btn dark color="indigo" v-if="type" v-on:click="onClickSubmitBtn()">submit</v-btn>
                  <v-btn dark color="indigo" v-else v-on:click="onClickUpdateBtn()">update</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
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
      type: true,
      menu: ''
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
  .another{
    margin-right: 10%;
    margin-left:10%;
  }
  .another2{
    margin-top: 10%;
     margin-right: 10%;
     margin-left:10%;
   }
  .btnclass{
    margin-top: 2%;
    text-align: center;
  }
</style>
