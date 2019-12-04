<template>
  <v-card width="'60%'" light class="overlay-box mx-auto text-center">
    <v-card-title fixed>
      <v-icon v-on:click="close" class="close-btn">mdi-close</v-icon>
    </v-card-title>
    <v-form class="overlay-form">
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

<style>
  .overlay-box {
    height: 100%;
    overflow: scroll;
  }

  .v-overlay__content {
    width: 60%;
    height: 60%;
  }

  .overlay-form {
    padding: 30px;
  }
</style>
