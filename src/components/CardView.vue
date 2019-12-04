<template>
  <v-card raised class="mx-auto text-center" id="card">
    <slot>

    </slot>
  </v-card>
</template>

<script>
export default {
  name: 'CardView'
};
</script>

<style scoped>
  #card {
    width: 90%;
    height: 90%;
    overflow: scroll;
  }
</style>
