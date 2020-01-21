<template>
  <div>
    <span v-if="darkMode === false"> 🌚 </span>
    <span v-else> 🌞 </span>
    <input v-model="darkMode" type="checkbox" class="theme-switch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    };
  },
  watch: {
    darkMode: function() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;
      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
