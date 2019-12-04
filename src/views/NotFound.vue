<template>
  <v-app id="main">
    <div class="top-padding"></div>
    <v-card raised class="mx-auto text-center" id="card">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <h1 class="display-0 d-block">404</h1>
            <div class="mb-4 lead display-4">죄송합니다 페이지를 찾을 수 없습니다.</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
  #main {
    width: 100%;
  }

  #card {
    width: 90%;
    height: 90%;
  }

  .top-padding {
    height: 3%;
  }
</style>
