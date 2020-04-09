<template>
  <div class="to-do-tasks">
    <app-task-list :listType="'todoTasks'">To Do</app-task-list>
  </div>
</template>

<script>
export default {
  components: {
    AppTaskList: require("../shared/TaskList.vue").default
  }
};
</script>

<style scoped lang="scss">
</style>