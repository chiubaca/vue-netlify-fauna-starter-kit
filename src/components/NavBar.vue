<template>
  <nav id="nav-bar">
    <div id="nav-items">
      <router-link :to="{ name: 'home' }">🏠 Home</router-link>

      <router-link :to="{ name: 'journals' }">📔 Your Journals</router-link>

      <router-link :to="{ name: 'profile' }">🆔 Your Profile</router-link>

      <ThemeToggle />
    </div>
  </nav>
</template>

<script>
import ThemeToggle from "./ThemeToggle.vue";

export default {
  components: {
    ThemeToggle
  }
};
</script>

<style lang="scss" scoped>
nav#nav-bar #nav-items {
  display: flex;
  flex-flow: wrap;
  text-decoration: none;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  margin: 30px 10px 0 10px;
  background-color: var(--app-background-color);

  a {
    text-decoration: none;
    font-weight: bold;
    // border-bottom: solid 3px var(--primary);
  }

  a:hover {
    border-bottom: solid 3px var(--primary);
    padding-bottom: 5px;
  }
}
nav#nav-bar #nav-items > a,
div {
  margin: 20px;
}
</style>
