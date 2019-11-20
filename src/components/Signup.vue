<template>
  <v-app style="background: #FFFF;">
    <div id="signup">
      <v-form id="signup2">
        <v-container>
          <h2>등록</h2>
          <v-layout column>
            <v-flex>
              <v-text-field label="이름" v-model="name"></v-text-field>
              <v-text-field label="생년월일" v-model="birth"></v-text-field>
              <v-text-field label="ID" v-model="id"></v-text-field>
              <v-text-field label="password" v-model="password"></v-text-field>
              <v-btn dark color="indigo darken-2" @click="submit">save</v-btn>
              <v-btn id="exitbtn" dark color="indigo darken-2" @click="exit">exit</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      id: '',
      password: '',
      birth: ''
    };
  },
  methods: {
    submit () {
    },
    exit () {
    }
  }
};
</script>

<style scoped>
  *{
    text-align: center;
  }
  #sign{
    position: absolute;
    text-align: center;
    width:500px;
    margin:auto;
  }
  #exitbtn{
    margin-left: 20px;
  }
</style>
