<template>
  <v-app style="background: #FFFF;">
    <div>
      <ul class="nav flex-column">
        <li class="nav-item" v-if="isLogin">
          <router-link :to="{ path: '/'}" class="button">
            Home
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link :to="{ path: '/login'}" class="button">
            로그인
          </router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <button class="button v-list-item--link" v-on:click="onClickLogout">
            로그아웃
          </button>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link :to="{ path: '/registerRefugee'}" class="button">
            난민 등록
          </router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link :to="{ path: '/showRefugee'}" class="button">
            난민 리스트
          </router-link>
        </li>
        <li class="nav-item dropdown" v-if="isLogin">
          <router-link :to="{ path: '/writeVisit'}" class="button">
            방문일지 작성
          </router-link>
        </li>
        <li class="nav-item dropdown" v-if="isLogin">
          <router-link :to="{ path: '/showVisit'}" class="button">
            방문일지 확인
          </router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link :to="{ path: '/statistic'}" class="button">
            통계
          </router-link>
        </li>
      </ul>
    </div>
  </v-app>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import 'bootstrap';

export default {
  name: 'Navigation',
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
