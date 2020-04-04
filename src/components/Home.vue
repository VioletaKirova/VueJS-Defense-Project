<template>
  <div class="home">
    <app-tasks></app-tasks>
    <router-link to="/create">
      <v-btn bottom color="primary" dark fab fixed right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import AppTasks from "./shared/Tasks.vue";

export default {
  components: {
    AppTasks
  }
};
</script>

<style scoped lang="scss">
</style>