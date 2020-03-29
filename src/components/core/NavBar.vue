<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click="toggleDrawerHandler()" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Do It</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />
    <v-btn to="/register" class="nav-bar-btn" color="primary">Register</v-btn>
    <v-btn to="/login" class="nav-bar-btn" color="primary">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    drawerValue: Boolean
  },
  methods: {
    toggleDrawerHandler() {
      this.$emit("toggle", !this.drawerValue);
    }
  }
};
</script>

<style scoped lang="scss">
.nav-bar-btn {
  margin-left: 8px;
}
</style>