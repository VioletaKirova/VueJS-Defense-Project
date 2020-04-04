<template>
  <div class="task">
    <v-list-item>
      
      <template>
        <v-list-item-action>
          <v-checkbox
            v-model="task.completed"
            color="primary"
            @change="updateById({ id: id, value: $event })"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{ completed: task.completed }">{{ task.description }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="task.date || task.time" class="datetime-wrapper">
          <v-icon>mdi-calendar</v-icon>
          <v-list-item-action-text class="datetime" v-text="task.date"></v-list-item-action-text>
          <v-list-item-action-text class="datetime" v-text="task.time"></v-list-item-action-text>
        </v-list-item-action>
      </template>

      <v-col class="text-center actions-wrapper" cols="12" sm="1">
        <v-btn text small color="primary">Edit</v-btn>
        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on }">
            <v-btn text small color="error" v-on="on">Delete</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>

            <v-divider></v-divider>

            <v-card-actions class="card-actions-wrapper">
              <v-btn color="error" class="card-delete-btn" text @click="confirmDelete(id)">Delete it</v-btn>
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
    task: Object
  },
  methods: {
    ...mapActions("taskStore", ["updateById", "deleteById"]),
    confirmDelete(id) {
      this.dialog = false;
      this.deleteById(id);
    }
  }
};
</script>

<style scoped lang="scss">
.completed {
  color: #8bc34a;
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