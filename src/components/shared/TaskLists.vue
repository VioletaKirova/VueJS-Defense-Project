<template>
  <div class="task-lists">
    <app-task-list :listType="'todoTasks'">Todo</app-task-list>
    <app-task-list :listType="'inProgressTasks'" class="in-progress-list">In Progress</app-task-list>
    <app-task-list :listType="'completedTasks'" class="completed-list">Completed</app-task-list>
  </div>
</template>

<script>
import AppTaskList from "./TaskList.vue";

export default {
  components: {
    AppTaskList
  }
};
</script>

<style scoped lang="scss">
</style>