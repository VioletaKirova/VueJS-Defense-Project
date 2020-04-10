<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click="toggleDrawerHandler" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <router-link to="/dashboard" class="logo">Do It</router-link>
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
.logo {
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
}

.nav-bar-btn {
  margin-left: 8px;
}
</style>