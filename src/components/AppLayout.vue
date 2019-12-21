<template>
  <div class="app-layout">
    
    <header>
      <h1> REFACTOR: My Simple App With Netlify Authentication</h1>
    </header>

    <NavMenu />
    
    <router-view />
    
    <DevPanel />
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import DevPanel from "./DevPanel.vue"

export default {
  components: {
    NavMenu,
    DevPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '..//assets/styles/main.scss'

</style>
