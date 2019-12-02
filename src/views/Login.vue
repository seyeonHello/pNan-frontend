<template>
  <v-app>
    <v-card class="mx-auto text-center login-box">
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
    </v-card>
  </v-app>
</template>

<script>
import signup from './Signup';
import { mapActions } from 'vuex';
export default{
  name: 'Login',
  components: {
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
        alert('로그인에 실패하였습니다.');
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
  .login-box {
    padding: 50px;
  }
  .login-btn {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
