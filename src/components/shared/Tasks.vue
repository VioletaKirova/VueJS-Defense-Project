<template>
  <div class="tasks">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card class="mx-auto">
            <v-list subheader two-line flat>
              <v-subheader>Your Tasks</v-subheader>
              <v-list-item-group multiple>
                <template v-for="(task, index) in tasks">
                  <v-list-item :key="task.id">
                    <template>
                      <v-list-item-action>
                        <v-checkbox
                          v-model="task.completed"
                          color="primary"
                          @change="toggleCheckboxHandler($event, task)"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title
                          :class="{ completed: task.completed }"
                        >{{ task.description }}</v-list-item-title>
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

                  <v-divider v-if="index !== tasks.length - 1" :key="index"></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tasks: [
        {
          id: 10,
          description: "Task 1",
          completed: false,
          date: "22/05/2020",
          time: "18:00"
        },
        {
          id: 20,
          description: "Task 2",
          completed: false,
          date: "30/05/2020",
          time: "08:00"
        },
        {
          id: 30,
          description: "Task 3",
          completed: false,
          date: "03/06/2020",
          time: "15:00"
        }
      ]
    };
  },
  methods: {
    toggleCheckboxHandler(value, task) {
      task.completed = value;
    }
  }
};
</script>

<style scoped lang="scss">
.mx-auto {
  width: 100%;
}

.row.align-center.justify-center {
  margin-left: 1px;
}

.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
  margin: 5px 0 0 5px;
}

.datetime {
  font-size: 14px;
}

.mdi-calendar {
  padding-bottom: 20px;
  color: #717171 !important;
}

.completed {
  color: #8BC34A;
  text-decoration: line-through;
}
</style>