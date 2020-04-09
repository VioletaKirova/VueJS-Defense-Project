<template>
  <div>
    <v-container v-if="showTaskLoader" class="fill-height" fluid>
      <v-row align="center" justify="start">
        <v-subheader>Loading...</v-subheader>
      </v-row>
    </v-container>
    <div v-else class="task-lists">
      <app-task-list :listType="'todoTasks'">To Do</app-task-list>
      <app-task-list :listType="'inProgressTasks'" class="in-progress-list">In Progress</app-task-list>
      <app-task-list :listType="'completedTasks'" class="completed-list">Completed</app-task-list>
    </div>
  </div>
</template>

<script>
import AppTaskList from "./TaskList.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("taskStore", ["showTaskLoader"])
  },
  components: {
    AppTaskList
  }
};
</script>

<style scoped lang="scss">
</style>