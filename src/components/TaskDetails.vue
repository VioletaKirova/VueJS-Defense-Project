<template>
  <div class="task-details">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <v-card class="detais">
            <v-card-text>
              <p class="display-1 text--primary">{{ currentTask.title }}</p>
              <div class="text--primary">{{ currentTask.description }}</div>
            </v-card-text>
            <v-card-actions>

              <v-btn
                v-if="!currentTask.inProgress"
                small
                color="primary"
                class="status-btn"
                @click="changeStatus(id, !currentTask.inProgress)"
              >In Progress</v-btn>

              <v-btn
                v-else
                small
                class="status-btn in-progress"
                @click="changeStatus(id, !currentTask.inProgress)"
              >Not In Progress</v-btn>

              <v-btn small color="primary mr-2" @click="navigateToEdit">Edit</v-btn>

              <v-dialog v-model="dialog" width="400">
                <template v-slot:activator="{ on }">
                  <v-btn small color="error" v-on="on">Delete</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>
                  <v-divider></v-divider>
                  <v-card-actions class="card-actions-wrapper">
                    <v-btn
                      color="error"
                      class="card-delete-btn"
                      text
                      @click="confirmDelete"
                    >Delete it</v-btn>
                    <v-btn color="primary" text @click="dialog = false">Keep it</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: function() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters("taskStore", ["currentTask"]),
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions("taskStore", [
      "setCurrentTaskId",
      "updateById",
      "deleteById"
    ]),
    changeStatus(id, value) {
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
      this.$router.push("/");
    }
  },
  created() {
    this.setCurrentTaskId(this.id);
  }
};
</script>

<style scoped lang="scss">
.v-card {
  width: 100%;
}

.v-card.detais {
  width: 50%;
}

.row {
  margin-left: 1px;
}

.v-btn {
  margin-bottom: 15px;
}

.status-btn {
  margin-left: 10px;
}

.status-btn.in-progress {
  color: #ffa000;
}
</style>