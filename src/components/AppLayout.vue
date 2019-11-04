<template>
  <div class="app-layout">
    
    <header>
      <h1> My Simple App With Netlify Authentication</h1>
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


</style>
