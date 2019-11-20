<template>
  <v-app style="background: #FFFF;">
    <div id="login">
      <v-form id="sign">
        <v-container>
            <h2>login</h2>
          <v-layout column>
            <v-flex>
              <v-text-field v-model="id" solo label="id"></v-text-field>
              <v-text-field v-model="password" solo label="password" type="password"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center="">
            <v-btn color="indigo darken-3" dark @click="submit" router-link :to="{ path: '/'}">
                로그인</v-btn>
            <v-btn color="indigo darken-3" id="signup" dark @click="submit" router-link :to="{ path: '/signup'}">
              회원가입</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import signup from '../components/Signup';
export default{
  name: 'Login',
  components: {
    signup
  },
  data () {
    return {
      id: '',
      password: ''
    };
  },
  methods: {
    submit () {

    }
  }
};
</script>

<style scoped>
  template{
    overflow: hidden;
  }
  * {
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
