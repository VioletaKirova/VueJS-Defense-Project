<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click="toggleDrawerHandler" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <v-btn to="/dashboard" class="nav-bar-btn logo" text color="white">Do It</v-btn>
    </v-toolbar-title>
    <app-search-bar></app-search-bar>
    <v-spacer />
    <template v-if="!isLogged">
      <v-btn to="/register" class="nav-bar-btn" color="primary">Register</v-btn>
      <v-btn to="/login" class="nav-bar-btn" color="primary">Login</v-btn>
    </template>
    <template v-else>
      <v-btn class="nav-bar-btn" color="primary" @click="logout">logout</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import AppSearchBar from "./SearchBar.vue";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    drawer: Boolean
  },
  computed: {
    ...mapState("authStore", ["isLogged"])
  },
  methods: {
    ...mapActions("authStore", ["logout"]),
    toggleDrawerHandler() {
      this.$emit("toggle", !this.drawer);
    }
  },
  components: {
    AppSearchBar
  }
};
</script>

<style scoped lang="scss">
.v-btn.nav-bar-btn.logo {
  font-size: 18px;
}

.nav-bar-btn {
  margin-left: 8px;
}
</style>