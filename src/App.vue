<template>
<v-app id="app">
  <div class="row">
    <navigation v-if="isLogin" class="col-2" id="nav-bar"/>
    <div class="col-10" id="content">
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
  html {
    overflow: hidden;
  }
  body {
    padding: 0;
    margin: 0 auto;
  }

  .row, .col-2, .col-10 {
    padding: 0;
  }

  #content {
    box-sizing: border-box;
    max-height: 90%;
  }
</style>
