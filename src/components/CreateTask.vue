<template>
  <div class="create">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <v-subheader>Create Task</v-subheader>
          <form>
            <v-textarea
              v-model="description"
              :error-messages="descriptionErrors"
              :counter="512"
              label="Description"
              required
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
            ></v-textarea>
            <app-date-dialog :taskDateValue="null" @setDate="setDateHandler($event)"></app-date-dialog>
            <app-time-dialog :taskTimeValue="null" @setTime="setTimeHandler($event)"></app-time-dialog>
            <v-btn class="mr-4" color="primary" @click="submit">submit</v-btn>
          </form>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppTimeDialog from "./shared/TimeDialog.vue";
import AppDateDialog from "./shared/DateDialog.vue";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      task: {},
      description: "",
      date: null,
      time: null
    };
  },
  computed: {
    descriptionErrors() {
      const errors = [];

      if (!this.$v.description.$dirty) {
        return errors;
      }

      if (!this.$v.description.maxLength) {
        errors.push("Description must be at most 512 characters long");
      }

      if (!this.$v.description.required) {
        errors.push("Description is required.");
      }

      return errors;
    }
  },
  validations: {
    description: {
      required,
      maxLength: maxLength(512)
    }
  },
  methods: {
    ...mapActions("taskStore", ["create"]),
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
          description: this.description,
          date: this.date,
          time: this.time,
          inProgress: false,
          completed: false
        };

        this.create(this.task);
        this.$router.push("/");
      }
    }
  },
  components: {
    AppTimeDialog,
    AppDateDialog
  }
};
</script>

<style scoped lang="scss">
form {
  width: 100%;
  padding-left: 20px;
}

.v-input {
  width: 50%;
}

.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
  margin: 5px 0 0 3px;
}
</style>