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

export default {
  name: 'App',
  components: { navigation }
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
