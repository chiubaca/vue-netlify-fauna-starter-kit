<template>
  <div class="app-background">
    <SideBar />

    <router-view />
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";

export default {
  components: {
    SideBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "..//assets/styles/main.scss";
</style>
