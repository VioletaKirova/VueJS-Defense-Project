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
.v-card {
  width: 100%;
}

.row {
  margin-left: 1px;
}

div.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
  margin: 5px 0 5px 3px;
}

.v-btn {
  margin: 5px 0 20px 20px;
}
</style>