<template>
  <v-card light class="overlay-box mx-auto text-center">
    <v-card-title>
      <v-icon v-on:click="close" class="close-btn">mdi-close</v-icon>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout column>
          <v-flex id="enrollNan">
            <slot></slot>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'overlay',
  methods: {
    close () {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
  .overlay-box {
    padding: 60px;
  }
</style>
