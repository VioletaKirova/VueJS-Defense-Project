<template>
  <div class="task-list">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card class="mx-auto">
            <v-list v-if="Object.keys(tasks).length !== 0" subheader two-line flat>
              <v-subheader><slot></slot></v-subheader>
              <v-list-item-group multiple>
                <template v-for="(task, key, index) in tasks">
                  <v-divider :key="index"></v-divider>
                  <app-task :key="key" :id="key" :task="task" :listType="listType"></app-task>
                </template>
              </v-list-item-group>
            </v-list>
            <template v-else-if="listType !== 'inProgressTasks' && listType !== 'completedTasks' && !searchValue">
              <v-subheader>No tasks to do!</v-subheader>
              <router-link to="/create">
                <v-btn small color="primary">Add a new task</v-btn>
              </router-link>
            </template>
            <template v-else-if="listType !== 'inProgressTasks' && listType !== 'completedTasks' && searchValue">
              <v-subheader>No results!</v-subheader>
              <v-btn small color="primary" @click="setSearchValue('')">Back to all tasks</v-btn>
            </template>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppTask from "./Task.vue";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    listType: {
      required: true
    }
  },
  computed: {
    ...mapState("taskStore", ["searchValue"]),
    tasks() {
      return this.$store.getters[`taskStore/${this.listType}`];
    }
  },
  methods: {
    ...mapActions("taskStore", ["setSearchValue"])
  },
  components: {
    AppTask
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
  margin: 5px 0 20px 18px;
}
</style>