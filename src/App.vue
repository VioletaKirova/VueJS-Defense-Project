<template>
  <v-app>
    <div id="app">
      <app-header></app-header>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AppHeader from "./components/core/Header.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AppHeader
  },
  methods: {
    ...mapActions("authStore", ["authStateChangeHandler"])
  },
  mounted() {
    this.authStateChangeHandler();
  }
};
</script>

<style lang="scss">
form {
  width: 100%;
  padding-left: 20px;
}

.v-input {
  width: 50%;
}

div.task-list.in-progress-list > main,
div.task-list.completed-list > main {
  padding-top: 0px !important;
}

.in-progress-list .v-subheader,
.in-progress-tasks .v-subheader {
  color: #ffa000 !important;
}

.completed-list .v-subheader,
.completed-tasks .v-subheader {
  color: #689f38 !important;
}
</style>
