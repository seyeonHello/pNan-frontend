<template>
  <v-app>
    <div id="login">
      <img src="../assets/logo.png">
      <v-form id="sign">
        <v-container>
          <v-layout column>
            <v-flex>
              <v-text-field v-model="input.id" solo label="id"></v-text-field>
              <v-text-field v-model="input.pw" solo label="password" type="password"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center="">
            <v-btn color="indigo darken-3" dark v-on:click="onClickLogin">
                로그인</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </div>
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
    async onClickLogin () {
      await this.$store.dispatch('login', { uid: this.input.id, password: this.input.pw });
      if (this.$store.getters.getIsAuth) {
        window.alert('로그인 되었습니다.');
        this.$router.push({
          name: 'Intro'
        });
      } else {
        window.alert('로그인에 실패하였습니다.');
      }
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
  #signup{
    margin-left: 20px;
  }
</style>
