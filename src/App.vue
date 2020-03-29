<template>
  <v-app>
    <div id="app">
      <app-header></app-header>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AppHeader from "./components/core/Header.vue";

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
</style>
