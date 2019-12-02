<template>
<v-app id="app">
  <div id="chart">
      <apexchart type=bar height=350 :options="chartOptions" :series="series" />
  </div>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <div class="row">
    <navigation v-if="isLogin" class="col-2" id="nav-bar"/>
    <div class="col-10 mt-4">
        <router-view/>
    </div>
  </div>
</v-app>
</template>

<script>
import navigation from './components/Navigation';
import { mapActions } from 'vuex';
import store from './store/store';

export default {
  name: 'App',
  components: { navigation },
  methods: {
    ...mapActions(['logout']),
    onClickLogout () {
      this.logout(store);
      if (!this.$store.getters.getIsAuth) {
        window.alert('로그아웃 되었습니다.');
        this.$router.push({ name: 'Login' });
      } else {
        window.alert('로그아웃에 실패하였습니다.');
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsAuth;
    }
  }
};

</script>

<style scoped>
  * {
    margin: 0 auto;
    padding: 0;
  }

  img {
    width: 150px;
    height: auto;
    margin: 10px;
  }

  #nav-bar{
    width: 100%;
    padding: 0;
    z-index: 500;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .title {
    padding-left: 30px;
    width: 100%;
    z-index: 10;
  }

  .row {
    width: 100%;
  }

  .col-10 {
    margin : 0 auto;
    padding: 0;
  }
</style>
