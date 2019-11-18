<template>
  <v-app style="background: #FFFF;">
    <div id="enroll">
      <v-form id="enrollNan">
        <v-container>
          <h2>등록</h2>
          <v-layout column>
            <v-flex>
              <v-text-field label="이름" v-model="name"></v-text-field>
              <v-text-field label="국적" v-model="area"></v-text-field>
              <v-text-field label="생년월일(6자리)" v-model="birth"></v-text-field>
              <v-textarea label="status" v-model="status"></v-textarea>
              <v-btn dark color="indigo" @click="submit">submit</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'enrollNan',
  data () {
    return {
      name: '',
      birth: '',
      area: '',
      status: ''
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

<style scoped>
  *{
    text-align: center;
  }

  #enroll2{
    text-align:center;
    display: inline-block;
    vertical-align: middle;
    width:500px;
    margin:auto;
  }
</style>
