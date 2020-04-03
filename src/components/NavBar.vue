<template>
  <nav v-if="currentUser" id="nav-bar">
    <div id="nav-items">
      <router-link :to="{ name: 'home' }">🏠 Home</router-link>

      <router-link :to="{ name: 'journals' }">📔 Your Journals</router-link>

      <router-link id="profile-link" :to="{ name: 'profile' }"
        >🆔 Profile</router-link
      >

      <ThemeToggle />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import ThemeToggle from "./ThemeToggle.vue";

export default {
  components: {
    ThemeToggle
  },
  computed: {
    ...mapGetters("auth", ["currentUser"])
  }
};
</script>

<style lang="scss" scoped>
nav#nav-bar {
  background-color: var(--app-secondary-background-color);
}

nav#nav-bar #nav-items {
  display: flex;
  flex-flow: wrap;
  text-decoration: none;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  margin: 30px 10px 0 10px;

  a {
    border-bottom: solid 3px rgba(255, 255, 255, 0);
    padding-bottom: 5px;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    border-bottom: solid 3px var(--primary);
    padding-bottom: 5px;
  }
  a#profile-link {
    text-transform: capitalize;
  }
}
nav#nav-bar #nav-items > a,
div {
  margin: 20px;
}
</style>
