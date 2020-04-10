<template>
  <div class="create">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <v-subheader>Edit Task</v-subheader>
          <form>
            <v-text-field
              v-model="title"
              :error-messages="titleErrors"
              label="Title"
              required
              @blur="$v.title.$touch()"
            ></v-text-field>
            <v-textarea
              v-model="description"
              :error-messages="descriptionErrors"
              :counter="512"
              label="Description"
              required
              @blur="$v.description.$touch()"
            ></v-textarea>
            <app-date-dialog :taskDateValue="this.date" @setDate="setDateHandler($event)"></app-date-dialog>
            <app-time-dialog :taskTimeValue="this.time" @setTime="setTimeHandler($event)"></app-time-dialog>
            <v-btn class="primary mr-4" @click="submit">Submit</v-btn>
          </form>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppTimeDialog from "../shared/TimeDialog.vue";
import AppDateDialog from "../shared/DateDialog.vue";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      task: {},
      title: "",
      description: "",
      date: "",
      time: "",
      inProgress: false,
      completed: false
    };
  },
  computed: {
    ...mapGetters("taskStore", ["allTasks"]),
    currentTaskId() {
      return this.$route.params.id;
    },
    currentTask() {
      return this.allTasks[this.currentTaskId];
    },
    titleErrors() {
      const errors = [];

      if (!this.$v.title.$dirty) {
        return errors;
      }
      if (!this.$v.title.maxLength) {
        errors.push("Title must be at most 20 characters long");
      }
      if (!this.$v.title.required) {
        errors.push("Title is required");
      }

      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.description.$dirty) {
        return errors;
      }
      if (!this.$v.description.required) {
        errors.push("Description is required");
      }
      if (!this.$v.description.maxLength) {
        errors.push("Description must be at most 512 characters long");
      }

      return errors;
    }
  },
  validations: {
    title: {
      required,
      maxLength: maxLength(20)
    },
    description: {
      required,
      maxLength: maxLength(512)
    }
  },
  methods: {
    ...mapActions("taskStore", ["updateById"]),
    setDateHandler(value) {
      this.date = value;
    },
    setTimeHandler(value) {
      this.time = value;
    },
    submit() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.task = {
          title: this.title,
          description: this.description,
          inProgress: this.inProgress,
          completed: this.completed
        };

        this.task.date = this.date ? this.date : "";
        this.task.time = this.time ? this.time : "";

        this.updateById({
          id: this.currentTaskId,
          value: this.task
        });
        this.$router.push("/dashboard");
      }
    }
  },
  components: {
    AppTimeDialog,
    AppDateDialog
  },
  created() {
    this.title = this.currentTask.title;
    this.description = this.currentTask.description;
    this.date = this.currentTask.date;
    this.time = this.currentTask.time;
    this.inProgress = this.currentTask.inProgress;
    this.completed = this.currentTask.completed;
  }
};
</script>

<style scoped lang="scss">
.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
  margin: 5px 0 0 3px;
}
</style>