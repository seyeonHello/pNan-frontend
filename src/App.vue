<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hr>
    <navigation id="nav-bar"/>
  </div>
</template>

<script>
import navigation from './components/Navigation';

export default {
  name: 'App',
  components: { navigation }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
