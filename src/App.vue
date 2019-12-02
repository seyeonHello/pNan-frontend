<template>
<v-app style="background: #FFFF;">
  <div id="app">
    <v-card width="100%">
      <v-list>
        <v-list-item>
            <v-list-item-title>
              <a href="/">
                <img style="padding-left:30px" src="./assets/logo.png">
              </a>
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
    <div class="container-fluid row flex-nowrap">
      <navigation id="nav-bar"/>
      <div class="col-10">
          <router-view/>
        </div>
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

<style>
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
  }

  #app {
  width: 100%;
  height: 100%;
  }
</style>
