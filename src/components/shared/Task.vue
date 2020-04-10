<template>
  <div class="task">
    <v-list-item @click="navigateToDetails">
      <template>
        <v-list-item-action>
          <v-checkbox
            v-model="task.completed"
            color="primary"
            @change="changeCompletedStatus(id, !!task.completed)"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{ completed: task.completed }">{{ task.title }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            v-if="!task.inProgress && listType !== 'completedTasks'"
            small
            color="primary"
            class="status-btn"
            @click="changeInRrogressStatus(id, !!task.inProgress)"
          >In Progress</v-btn>
          <v-btn
            v-else-if="task.inProgress && listType !== 'completedTasks'"
            small
            class="status-btn in-progress"
            @click="changeInRrogressStatus(id, !task.inProgress)"
          >Not In Progress</v-btn>
        </v-list-item-action>

        <v-list-item-action v-if="task.date || task.time" class="datetime-wrapper">
          <v-icon>mdi-calendar</v-icon>
          <v-list-item-action-text class="datetime" v-text="task.date"></v-list-item-action-text>
          <v-list-item-action-text class="datetime" v-text="task.time"></v-list-item-action-text>
        </v-list-item-action>
      </template>

      <v-col class="text-center actions-wrapper" cols="12" sm="1">
        <v-btn text small color="primary" @click="navigateToEdit">Edit</v-btn>

        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on }">
            <v-btn text small color="error" v-on="on">Delete</v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="card-actions-wrapper">
              <v-btn color="error" class="card-delete-btn" text @click="confirmDelete">Delete it</v-btn>
              <v-btn color="primary" text @click="dialog = false">Keep it</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      dialog: false
    };
  },
  props: {
    id: String,
    task: Object,
    listType: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions("taskStore", ["updateById", "deleteById"]),
    changeCompletedStatus(id, value) {
      this.updateById({ id, value: { completed: value } });
    },
    changeInRrogressStatus(id, value) {
      this.updateById({ id, value: { inProgress: value } });
    },
    navigateToEdit() {
      this.$router.push({ name: "Edit", params: { id: this.id } });
    },
    navigateToDetails() {
      this.$router.push({ name: "Details", params: { id: this.id } });
    },
    confirmDelete() {
      this.dialog = false;
      this.deleteById(this.id);
    }
  }
};
</script>

<style scoped lang="scss">
.completed {
  color: #689f38;
  text-decoration: line-through;
}

.datetime-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.datetime {
  font-size: 14px;
  padding-top: 2px;
}

.status-btn {
  margin-right: 20px;
}

.status-btn.in-progress {
  color: #ffa000;
}

.mdi-calendar {
  color: #717171 !important;
  margin-top: 5px;
}

.actions-wrapper {
  margin-top: 5px;
}

.card-actions-wrapper {
  display: flex;
}

.card-delete-btn {
  margin-left: auto;
}
</style>