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
         <router-link :to="{ name: 'profile' }">Your Profile</router-link>
      </li>
       <li >
         <button @click="attemptLogout()"> Log Out</button>
      </li>

    </ul>
  
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "NavMenu",
    methods: {
      ...mapActions("auth", [
        "attemptLogout"
        ]),
    }

  }
</script>

<style lang="scss" scoped>

</style>