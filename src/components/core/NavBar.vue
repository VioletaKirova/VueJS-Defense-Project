<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click="toggleDrawerHandler" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Do It</span>
    </v-toolbar-title>
    <app-search-bar></app-search-bar>
    <v-spacer />
    <v-btn to="/register" class="nav-bar-btn" color="primary">Register</v-btn>
    <v-btn to="/login" class="nav-bar-btn" color="primary">Login</v-btn>
  </v-app-bar>
</template>

<script>
import AppSearchBar from "./SearchBar.vue";

export default {
  props: {
    drawer: Boolean
  },
  methods: {
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
.nav-bar-btn {
  margin-left: 8px;
}
</style>