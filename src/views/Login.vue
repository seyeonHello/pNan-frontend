<template>
  <v-app>
    <CardView>
      <img src="../assets/logo.png">
      <v-form id="sign">
        <v-container>
          <v-layout column>
            <v-flex>
              <v-text-field v-model="input.id" color="primary" outlined label="id" v-on:keypress="onClickLogin"></v-text-field>
              <v-text-field v-model="input.pw" color="primary" outlined label="password" type="password" v-on:keypress="onClickLogin"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-btn raised large color="primary" class="login-btn" v-on:click="onClickLogin">
              Login
            </v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </CardView>
  </v-app>
</template>

<script>
import signup from './Signup';
import { mapActions } from 'vuex';
import CardView from '../components/CardView';
export default{
  name: 'Login',
  components: {
    CardView,
    signup
  },
  data () {
    return {
      input: {
        id: '',
        pw: ''
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    async onClickLogin (e) {
      try {
        if (e.keyCode) {
          if (e.keyCode === 13) {
            if (!this.validateInput()) {
              alert('id/pw 를 둘 다 입력해주세요');
              return;
            }
            await this.$store.dispatch('login', { uid: this.input.id, password: this.input.pw });
          } else {
            return;
          }
        } else {
          if (this.validateInput()) {
            await this.$store.dispatch('login', { uid: this.input.id, password: this.input.pw });
          } else {
            alert('id/pw 를 둘 다 입력해주세요');
            return;
          }
        }
      } catch (err) {
        if (err.response.data.message === 'ID do not match') {
          alert('존재하지 않는 아이디입니다.');
        } else if (err.response.data.message === 'Password do not match.') {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert('로그인에 실패하였습니다.');
        }
        return;
      }
      if (this.$store.getters.getIsAuth) {
        window.alert('로그인 되었습니다.');
        window.location.href = '/';
      } else {
        window.alert('로그인에 실패하였습니다.');
      }
    },
    validateInput () {
      if (!this.input.id.length || !this.input.pw.length) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
  template{
    overflow: hidden;
  }
  * {
     margin-top: 1rem;
    text-align:center;
  }
  #sign{
    text-align:center;
    display: inline-block;
    vertical-align: middle;
    width:350px;
  }
  .login-btn {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
