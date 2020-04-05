<template>
  <div class="completed-tasks">
    <app-task-list :listType="'completedTasks'">Completed</app-task-list>
  </div>
</template>

<script>
export default {
  components: {
    AppTaskList: require("./shared/TaskList.vue").default
  }
};
</script>

<style scoped lang="scss">
</style>