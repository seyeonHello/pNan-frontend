<template>
  <v-card class="mx-auto text-center" max-width="95%" height="85%">
    <v-form>
      <v-container>
        <v-layout column>
          <v-flex id="enrollNan">
            <v-text-field class="text" label="이름" v-model="name"></v-text-field>
            <v-text-field label="국적" v-model="nationality"></v-text-field>
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
                <v-btn text color="indigo" @click="menu = false">취소</v-btn>
                <v-btn text color="indigo" @click="$refs.menu.save(birth)">확인</v-btn>
              </v-date-picker>
            </v-menu>
            <v-autocomplete :items="statuslist" label="status" v-model="status"></v-autocomplete>
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
  name: 'enrollNan',
  data () {
    return {
      id: '',
      name: '',
      birth: '',
      nationality: '',
      status: '',
      type: true,
      menu: '',
      statuslist: ['신청 전', '신청', '이의 신청', '1심', '2심', '3심', '재신청', '기타']
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
        axios.post('/api/v1/refugee',
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
      axios.put('/api/v1/refugee/' + this.id,
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
  #enrollNan{
    margin-top: 5%;
  }
  .text{
    width:350px;
  }
  .btnclass{
    margin-top: 7%;
  }
</style>
