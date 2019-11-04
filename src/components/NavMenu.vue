<template>
  <div class="nav-menu">
    <ul>
      <li>  
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
         <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li>
         <router-link :to="{ name: 'restricted' }">Restricted</router-link>
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

</style>