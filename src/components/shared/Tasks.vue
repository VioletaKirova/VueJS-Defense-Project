<template>
  <div class="tasks">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card class="mx-auto">
            <v-list subheader two-line flat>
              <v-subheader>Your Tasks</v-subheader>
              <v-list-item-group multiple>
                <template v-for="(task, key, index) in tasks">
                  <v-divider :key="index"></v-divider>

                  <app-task :key="key" :id="key" :task="task"></app-task>
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
import { mapGetters } from "vuex";
import AppTask from "./Task.vue";

export default {
  computed: {
    ...mapGetters("taskStore", ["tasks"])
  },
  components: {
    AppTask
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

.theme--light.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
  margin: 5px 0 0 5px;
}
</style>