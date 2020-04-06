<template>
  <div class="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <v-subheader>Login</v-subheader>
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
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-btn class="primary mr-4" @click="submit">Login</v-btn>
            <v-btn @click="clear">Clear</v-btn>
          </form>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) {
        return errors;
      }
      if (!this.$v.email.required) {
        errors.push("Please enter your e-mail");
      }

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("Please enter your password");
      }

      return errors;
    }
  },
  validations: {
    email: { required },
    password: { required }
  },
  methods: {
    ...mapActions("authStore", ["login"]),
    submit() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.login({
          email: this.email,
          password: this.password
        });
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
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