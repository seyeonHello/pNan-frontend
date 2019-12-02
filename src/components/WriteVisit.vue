<template>
  <v-card class="mx-auto text-center" max-width="95%" height="85%">
    <v-form>
      <v-container>
        <v-layout column>
          <v-flex id="enrollNan">
            <v-autocomplete :items="namesobject" label="이름" v-model="name" class="text"></v-autocomplete>
            <v-autocomplete label="지원종류" v-model="apply" :items="applies"></v-autocomplete>
            <div v-if="apply === '법률'">
              <v-autocomplete :items="laws" label="법률 종류" v-model="support"></v-autocomplete>
            </div>
            <div v-else-if="apply === '심리'">
              <v-autocomplete :items="Psychology" label="심리 종류" v-model="support"></v-autocomplete>
            </div>
            <div v-else-if="apply === '사회'">
              <v-autocomplete :items="socials" label="사회 종류" v-model="support"></v-autocomplete>
            </div>
            <div class="btnclass">
              <v-btn dark color="indigo" v-if="type" v-on:click="onClickSubmitBtn()">submit</v-btn>
              <v-btn dark color="indigo" v-else v-on:click="onClickUpdateBtn()">update</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      name: '',
      refugee_id: '',
      support: '',
      applies: ['법률', '의료', '심리', '사회'],
      apply: '',
      laws: ['인정 처우', '신청', '소송', '기타 법률'],
      law: '',
      Psychology: ['인테이크', '심리', '헤블데'],
      psychology: '',
      socials: ['한국어 수업', '직업 연계', '액티비티', '기초', '숙소'],
      social: '',
      nametabel: [],
      namesobject: [],
      id: '',
      visit_id: '',
      visitRefugee_id: '',
      type: true
    };
  },
  methods: {
    initRefugeeData () {
      axios.get('/api/v1/refugee')
        .then((res) => {
          console.log(res.data);
          this.nametabel = res.data;
          var i = 0;
          for (i; i < this.nametabel.length; i++) {
            this.namesobject.push(this.nametabel[i].name);
          }
        });
    },
    onClickSubmitBtn () {
      if (this.apply === '의료') {
        this.support = this.apply;
      }
      axios.post('/api/v1/visitlog',
        { refugee_id: this.id, support: this.support })
        .then((res) => {
          console.log(res);
          alert('등록이 완료되었습니다.');
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.apply = '';
          this.support = '';
          this.name = '';
        }
        );
    },
    onClickUpdateBtn () {
      if (this.apply === '의료') {
        this.support = this.apply;
      }
      axios.put('/api/v1/visitlog/' + this.visit_id,
        { support: this.support, refugee_id: this.visitRefugee_id })
        .then((res) => {
          alert('수정이 완료되었습니다.');
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.apply = '';
          this.support = '';
          this.name = '';
        }
        );
    }
  },
  mounted () {
    this.initRefugeeData();
    if (this.$route.params.type === 'update') {
      this.type = false;
      this.name = this.$route.params.visit.name;
      this.visitRefugee_id = this.$route.params.visit.refugee_id;
      this.visit_id = this.$route.params.visit.id;
      this.support = this.$route.params.visit.support;
    } else {
      this.type = true;
    }
    for (var i in this.socials) {
      if (this.support === this.laws[i]) {
        this.apply = this.applies[0];
        break;
      }
      if (this.support === this.applies[1]) {
        this.apply = this.support;
        break;
      }
      if (this.support === this.Psychology[i]) {
        this.apply = this.applies[2];
        break;
      }
      if (this.support === this.socials[i]) {
        console.log(this.support);
        this.apply = this.applies[3];
        break;
      }
    }
  }
};
</script>

<style>
  #enrollNan{
    margin-top: 5%;
  }
  .btnclass{
    text-align: center;
    margin-top: 7%;
  }
  .text{
    width:350px;
  }
</style>
