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
        <router-link :to="{ name: 'allposts' }">All Posts</router-link>
      </li>
      <li>
         <router-link :to="{ name: 'profile' }">Your Profile</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
  }
</script>

<style lang="scss" scoped>
  .nav-menu{
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
  }
</style>