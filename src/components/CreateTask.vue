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
            <v-dialog
              ref="dateDialog"
              v-model="dateDialog"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dateDialog = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-dialog
              ref="timeDialog"
              v-model="timeDialog"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="timeDialog" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="timeDialog = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    description: {
      required,
      maxLength: maxLength(512)
    }
  },
  data: function() {
    return {
      description: "",
      date: new Date().toISOString().substr(0, 10),
      dateDialog: false,
      time: null,
      timeDialog: false
    };
  },
  computed: {
    descriptionErrors() {
      const errors = [];

      if (!this.$v.description.$dirty) {
        console.log(this.$refs);
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
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.description = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.time = null;
    }
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
  margin: 5px 0 0 5px;
}
</style>