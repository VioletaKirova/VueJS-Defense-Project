<template>
  <div class="register">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <v-subheader>Register</v-subheader>
          <form>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password"
              type="password"
              required
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="rePassword"
              :error-messages="rePasswordErrors"
              label="Repeat Password"
              type="password"
              required
              @blur="$v.rePassword.$touch()"
            ></v-text-field>
            <p class="error-message">{{ authError }}</p>
            <v-btn class="primary mr-4" @click="submit">Register</v-btn>
            <v-btn @click="clear">Clear</v-btn>
          </form>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

const aplhanumeric = helpers.regex("aplhanumeric", /^[a-zA-Z0-9]*$/);

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      email: "",
      password: "",
      rePassword: ""
    };
  },
  computed: {
    ...mapState("authStore", ["authError"]),
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) {
        return errors;
      }
      if (!this.$v.email.required) {
        errors.push("E-mail is required");
      }
      if (!this.$v.email.email) {
        errors.push("Must be valid e-mail");
      }

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("Password is required");
      }
      if (!this.$v.password.minLength) {
        errors.push("Password must be at least 6 characters long");
      }
      if (!this.$v.password.maxLength) {
        errors.push("Password must be at most 16 characters long");
      }
      if (!this.$v.password.aplhanumeric) {
        errors.push("Password must contain only letters and digits");
      }

      return errors;
    },
    rePasswordErrors() {
      const errors = [];

      if (!this.$v.rePassword.$dirty) {
        return errors;
      }
      if (!this.$v.rePassword.sameAsPassword) {
        errors.push("Passwords do not match");
      }

      return errors;
    }
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(16),
      aplhanumeric
    },
    rePassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    ...mapActions("authStore", ["register"]),
    submit() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.register({
          email: this.email,
          password: this.password
        });
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
      this.rePassword = "";
    }
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