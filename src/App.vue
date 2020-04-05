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
div.task-list.in-progress-list > main,
div.task-list.completed-list > main {
  padding-top: 0px !important;
}

.in-progress-list .v-subheader,
.in-progress-tasks .v-subheader {
  color: #FFA000 !important;
}

.completed-list .v-subheader,
.completed-tasks .v-subheader {
  color: #689F38 !important;
}
</style>
