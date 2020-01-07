<template>
  <div class="app-layout app-background">
    
    <header>
      <h1> A super charged JAM stack powered by Vue.js, Netlify and FaunaDB 🚀 </h1>
    </header>

    <NavMenu />
    
    <router-view />
    
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";

export default {
  components: {
    NavMenu
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '..//assets/styles/main.scss'

</style>
