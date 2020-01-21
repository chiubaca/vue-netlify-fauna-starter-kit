<template>
  <main class="home space">
    <h1>Vue - Netlify - Fauna</h1>
    <h2>A JAM stack template with authentication baked in</h2>
    <Login />
  </main>
</template>

<script>
import Login from "./Login.vue";

export default {
  name: "Home",
  components: {
    Login
  },
  props: {
    msg: String
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home {
  height: 100vh;
}

.test-area {
  background-color: beige;
  width: 500px;

  span {
    background-color: red;
    padding: 5px;
  }
}
</style>
