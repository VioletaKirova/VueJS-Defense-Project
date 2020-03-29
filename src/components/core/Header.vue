<template>
  <div id="header">
    <app-nav-drawer :drawerValue="drawerValue"></app-nav-drawer>
    <app-nav-bar :drawerValue="drawerValue" @toggle="toggleHandler($event)"></app-nav-bar>
  </div>
</template>

<script>
import AppNavDrawer from "./NavDrawer.vue";
import AppNavBar from "./NavBar.vue";

export default {
  data: function() {
    return {
      drawerValue: true
    }
  },
  components: {
    AppNavDrawer,
    AppNavBar
  },
  methods: {
    toggleHandler(value) {
     this.drawerValue = value;
    }
  }
};
</script>

<style scoped lang="scss">
</style>