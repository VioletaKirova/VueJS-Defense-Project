<template>
  <v-dialog
    ref="timeDialog"
    v-model="timeDialog"
    :return-value.sync="timeValue"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="timeValue" label="Time" prepend-icon="mdi-clock-outline" readonly v-on="on"></v-text-field>
    </template>
    <v-time-picker v-if="timeDialog" v-model="timeValue" full-width>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="timeDialog = false">Cancel</v-btn>
      <v-btn text color="primary" @click="setTimeHandler">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      timeValue: null,
      timeDialog: false,
    };
  },
  methods: {
    setTimeHandler() {
      this.$refs.timeDialog.save(this.timeValue);
      this.$emit("setTime", this.timeValue);
    }
  }
};
</script>

<style scoped lang="scss">
.v-input {
  width: 50%;
}
</style>