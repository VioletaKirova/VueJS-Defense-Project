<template>
  <div class="home">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="start">
          <div class="content-wrapper">
            <div class="text-content-container">
              <h1>Start organizing your projects with DO IT</h1>
              <v-btn to="/register" class="nav-bar-btn mr-2" color="primary">Register</v-btn>
              <v-btn to="/login" class="nav-bar-btn" color="primary">Login</v-btn>
            </div>
            <div class="img-container">
              <img :src="require('../../public/img/home-img.png')" />
            </div>
          </div>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.content-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0 30px;
}

.text-content-container {
  margin-top: 150px;
}

h1 {
  color: #1976d2;
  padding-bottom: 30px;
}

.img-container {
  width: 50%;
  margin: 30px 0 0 10px;
  img {
    width: 100%;
  }
}
</style>