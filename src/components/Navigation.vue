<template>
  <v-app>
    <v-card height="100%" width="100%">
      <v-navigation-drawer class="accent-4" permanent>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <router-link :to="{ path: item.link}" style="text-decoration: none; color: inherit">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>

export default {
  name: 'Navigation',
  data () {
    return {
      items: [
        { title: '난민등록', link: '/registerRefugee' },
        { title: '난민리스트', link: '/showRefugee' },
        { title: '방문일지 작성', link: '/writeVisit' },
        { title: '방문일지 확인', link: '/showVisit' },
        { title: '통계', link: '/statistic' }
      ]
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
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsAuth;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: auto;
  }
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    text-align: center;
    height: 50px;
    margin: 0 auto;
    width: 100%;
  }

  a {
    color: deepskyblue;
  }

  .navbar-brand img {
    width: 150px;
    height: auto;
  }

</style>
