<template>
  <div class="app-layout">
    
    <header>
      <h1> My Simple App With Netlify Authentication</h1>
    </header>

    <NavMenu />
    <DevPanel />
    
    <router-view />
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
