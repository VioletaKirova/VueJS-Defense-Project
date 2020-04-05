<template>
  <div class="completed-tasks">
    <app-task-list :listType="'completedTasks'">Completed</app-task-list>
  </div>
</template>

<script>
import AppTaskList from "./shared/TaskList.vue";

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