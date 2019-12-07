<template>
<v-app id="app">
  <div class="row">
    <navigation class="col-2" id="nav-bar"/>
    <div class="col-10" id="content">
        <router-view/>
    </div>
  </div>
</v-app>
</template>

<script>
import navigation from './components/Navigation';
import axios from 'axios';

export default {
  name: 'App',
  components: { navigation },
  data () {
    return {
      refreshInterval: null
    };
  },
  mounted () {
    const store = this.$store;
    this.refreshInterval = setInterval(function () {
      axios.get('/api/v1/auth/refresh').then(function (result) {
        if (result.data.token) {
          store.dispatch('refreshToken', { token: result.data.token });
        } else {
          store.dispatch('logout');
          if (!this.$store.getters.getIsAuth) {
            window.alert('로그아웃 되었습니다.');
            this.$router.push({ name: 'Login' });
          } else {
            window.alert('로그아웃에 실패하였습니다.');
          }
        }
      });
    }, 1000 * 60 * 60);
  },
  beforeDestroy () {
    clearInterval(this.refreshInterval);
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

  ::-webkit-scrollbar {
    display:none;
  }

</style>
