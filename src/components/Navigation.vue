<template>
  <v-app>
    <v-card outlined height="100%" width="100%">
      <v-list>
        <a href="/">
          <img id="nav-logo" src="../assets/logo.png">
        </a>
        <v-divider  v-if="isLogin" class="nav-div"></v-divider>
        <v-list-item v-if="isLogin" v-for="item in items" :key="item.title" link>
          <v-list-item-content class="menu-item" v-on:click="onClickLink(item.link)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider  v-if="isLogin" class="nav-div"></v-divider>
        <v-list-item v-if="isLogin && isAdmin" link>
          <v-list-item-content class="menu-item" v-on:click="onClickLink(adminPage.link)">
            <v-list-item-title>{{ adminPage.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider  v-if="isLogin && isAdmin" class="nav-div"></v-divider>
        <v-btn v-if="isLogin" outlined color="red" v-on:click="onClickLogout">
          Logout
        </v-btn>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      items: [
        { title: 'Home', link: '/' },
        { title: '난민리스트', link: '/showRefugee' },
        { title: '방문일지 확인', link: '/showVisit' },
        { title: '통계', link: '/statistic' }
      ],
      adminPage: { title: '직원 관리', link: '/admin' }
    };
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('logout');
      if (!this.$store.getters.getIsAuth) {
        window.alert('로그아웃 되었습니다.');
        this.$router.push({ name: 'Login' });
      } else {
        window.alert('로그아웃에 실패하였습니다.');
      }
    },
    onClickLink (link) {
      if (this.$route.path !== link) { this.$router.push({ path: link }); }
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsAuth;
    },
    isAdmin () {
      return this.$store.getters.getIsAdmin;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    text-align: center;
    margin: 0 auto;
    padding: 0 auto;
  }

  #nav-logo {
    width: 80%;
    height: auto;
  }
  .nav-div {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
