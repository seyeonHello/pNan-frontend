<template>
  <v-app id="main">
    <div class="top-padding"></div>
    <CardView>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <h1 class="display-0 d-block">404</h1>
            <div class="mb-4 lead display-4">죄송합니다 페이지를 찾을 수 없습니다.</div>
          </div>
        </div>
      </div>
    </CardView>
  </v-app>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import CardView from '../components/CardView';
export default {
  name: 'NotFound',
  components: { CardView }
};
</script>

<style scoped>
  #main {
    width: 100%;
  }
  .top-padding {
    height: 3%;
  }
</style>
