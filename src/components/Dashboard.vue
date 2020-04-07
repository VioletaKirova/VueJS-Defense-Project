<template>
  <div class="dashboard">
    <app-task-lists></app-task-lists>
    <router-link to="/create">
      <v-btn bottom color="primary" dark fab fixed right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import AppTaskLists from "./shared/TaskLists.vue";

export default {
  components: {
    AppTaskLists
  }
};
</script>

<style scoped lang="scss">
</style>