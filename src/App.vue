<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
