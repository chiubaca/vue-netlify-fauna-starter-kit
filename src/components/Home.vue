<template>
  <main class="home space">
    <h1>Vue - Netlify - Fauna</h1>
    <h2>A serverless stack with authentication baked in</h2>
    <div>
      <p>
        This is a demo app to show how you can use cool technologies like Fauna
        and Netlify to build a CRUD application completely serverless and host
        for free! 😎
      </p>

      <p>
        If you want to see how this is all glued together check out the
        <a href="https://github.com/chiubaca/vue-netlify-fauna-starter-kit"
          >source code</a
        >
        . Happy hacking!
      </p>
    </div>
    <Login v-if="currentUser === null" />
    <div v-else id="greeting">
      <h2>🖐️ Welcome Back!</h2>
      <p>
        You're logged in. Go check out your
        <router-link :to="{ name: 'journals' }">journals ➡️ </router-link>.
      </p>
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

#greeting {
  border-style: dashed;
  padding: 15px;
  border-radius: 15px;
  border-color: #c6c6c6;
  border-width: 1px;
}
</style>
