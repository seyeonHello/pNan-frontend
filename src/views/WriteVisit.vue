<template>
  <v-app style="background: #FFFF;">
      <v-container fluid>
        <v-layout>
          <v-flex>
            <div class="inputclass1">
              <v-text-field label="이름" v-model="name"></v-text-field>
            </div>
          </v-flex>
          <v-flex>
            <div class="inputclass1">
              <v-autocomplete label="지원종류" v-model="apply" :items="applies"></v-autocomplete>
            </div>
          </v-flex>
          <v-flex>
            <div class="inputclass1">
              <div v-if="apply === '법률'">
                <v-autocomplete :items="laws" label="법률 종류" v-model="support"></v-autocomplete>
              </div>
              <div v-else-if="apply === '심리'">
                <v-autocomplete :items="Psychology" label="심리 종류" v-model="support"></v-autocomplete>
              </div>
              <div v-else-if="apply === '사회'">
                <v-autocomplete :items="socials" label="사회 종류" v-model="support"></v-autocomplete>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-layout justify-center="">
          <v-flex>
            <div class="btnclass">
              <v-btn dark color="indigo darken-2" v-on:click="onClickSubmitBtn()">submit</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
// import axios from 'axios';
export default {
  data () {
    return {
      name: '',
      support: '',
      applies: ['법률', '의료', '심리', '사회'],
      apply: '',
      laws: ['인정 처우', '신청', '소송', '기타 법률'],
      law: '',
      Psychology: ['인테이크', '심리', '헤블데'],
      psychology: '',
      socials: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소'],
      social: ''
    };
  },
  methods: { // post 시도는 안해봄.
    /* onClickSubmitBtn () {
      axios.post('/api/v1/visitlog',
        { name: this.name, support: this.support })
        .then((res) => {
          console.log(res);
          alert('등록이 완료되었습니다.');
        })
        .catch(error => {
          console.log(error);
        });
    } */
  }
};
</script>

<style>
  .inputclass1{
    margin-left: 10%;
    margin-right: 5%;
    width:250px;
  }

  .btnclass{
    text-align: center;
    margin-top: 5%;
  }
</style>
