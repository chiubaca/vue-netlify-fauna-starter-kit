<template>
  <main class="home space">
    <h1>Vue - Netlify - Fauna</h1>
    <h2>A JAM stack template with authentication baked in</h2>
    <Login v-if="currentUser === null" />
    <div v-else>
      Welcome Back! <br />
      You're already logged in, Go check out your private
      <router-link :to="{ name: 'journals' }">journals</router-link>.
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters("auth", ["currentUser"])
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
