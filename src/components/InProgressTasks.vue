<template>
  <div class="in-progress-tasks">
    <app-task-list :listType="'inProgressTasks'">In Progress</app-task-list>
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