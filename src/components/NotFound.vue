<template>
  <div class="about">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <div class="content-wrapper">
            <h1>The page you are looking for doesn't exist :(</h1>
            <v-btn small color="primary" @click="navigateToDashboard">Go back to your tasks</v-btn>
          </div>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToDashboard() {
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped lang="scss">
.content-wrapper {
  padding: 10px 0 0 30px;
}

h1 {
  color: #1976d2;
  margin-bottom: 30px;
}
</style>
