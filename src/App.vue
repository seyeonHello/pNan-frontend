<template>
<v-app id="app">
  <div id="chart">
      <apexchart type=bar height=350 :options="chartOptions" :series="series" />
  </div>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <v-card class="title">
      <a href="/">
        <img src="./assets/logo.png">
      </a>
  </v-card>
  <div class="row">
    <navigation class="col-2" id="nav-bar"/>
    <div class="col-10">
        <router-view/>
    </div>
  </div>
</v-app>
</template>

<script>
import navigation from './components/Navigation';
// import store from './store/store';
export default {
  name: 'App',
  components: { navigation }
};

</script>

<style scoped>
  @import 'bootstrap/dist/css/bootstrap.min.css';
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
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .title {
    padding-left: 30px;
    width: 100%;
  }

  .row {
    width: 100%;
  }
</style>
