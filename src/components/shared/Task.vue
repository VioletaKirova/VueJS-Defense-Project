<template>
  <div class="task">
    <v-list-item>
      <template>
        <v-list-item-action>
          <v-checkbox
            v-model="task.completed"
            color="primary"
            @change="toggleCheckboxHandler($event, task)"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{ completed: task.completed }">{{ task.description }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-action>

        <v-list-item-action>
          <v-list-item-action-text class="datetime" v-text="task.date"></v-list-item-action-text>
          <v-list-item-action-text class="datetime" v-text="task.time"></v-list-item-action-text>
        </v-list-item-action>
      </template>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    task: Object
  },
  methods: {
    toggleCheckboxHandler(value, task) {
      task.completed = value;
    }
  }
};
</script>

<style scoped lang="scss">
.datetime {
  font-size: 14px;
}

.mdi-calendar {
  padding-bottom: 20px;
  color: #717171 !important;
}

.completed {
  color: #8bc34a;
  text-decoration: line-through;
}
</style>