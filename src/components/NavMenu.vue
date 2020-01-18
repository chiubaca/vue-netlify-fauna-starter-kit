<template>
  <div>
    <ul class="nav-menu">
      <li>  
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
         <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li>  
        <router-link :to="{ name: 'journals' }">All Journals</router-link>
      </li>
      <li>
         <router-link :to="{ name: 'profile' }">Your Profile</router-link>
      </li>
    </ul>
    <input v-model="darkMode" type="checkbox" class='theme-switch' />
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {
        darkMode: false,
      }
    },
    watch: {
      darkMode: function () {
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
    },
  }
</script>

<style lang="scss" scoped>
  .nav-menu{
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
  }
</style>