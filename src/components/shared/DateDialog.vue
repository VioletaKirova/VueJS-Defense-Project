<template>
  <v-dialog
    ref="dateDialog"
    v-model="dateDialog"
    :return-value.sync="dateValue"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="dateValue" label="Date" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="dateValue" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dateDialog = false">Cancel</v-btn>
      <v-btn text color="primary" @click="setDateHandler">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      dateValue: null,
      dateDialog: false
    }
  },
  props: {
    taskDateValue: {
      required: true
    }
  },
  methods: {
    setDateHandler() {
      this.$refs.dateDialog.save(this.dateValue);
      this.$emit("setDate", this.dateValue);
    }
  },
  created() {
    if(this.taskDateValue) {
      this.dateValue = this.taskDateValue;
    }
  }
};
</script>

<style scoped lang="scss">
.v-input {
  width: 50%;
}
</style>