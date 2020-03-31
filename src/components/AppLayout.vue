<template>
  <div class="app-background">
    <SideBar />

    <router-view />

    <Footer />
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    SideBar,
    Footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "..//assets/styles/main.scss";
</style>
