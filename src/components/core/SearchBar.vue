<template>
  <v-text-field
    v-model="search"
    flat
    solo-inverted
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="Search"
    class="hidden-sm-and-down"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("taskStore", ["searchValue"]),
    search: {
      get() {
        return this.searchValue;
      },
      set(value) {
        this.setSearchValue(value);
      }
    }
  },
  methods: {
    ...mapActions("taskStore", ["setSearchValue"])
  }
};
</script>

<style>
</style>