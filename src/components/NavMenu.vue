<template>
  <div class="nav-menu">
    <ul>
      <li>  
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li
        @click="openNetlifyAuth"  
        id="netlify-auth">
          Login
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
  import { mapActions, mapMutations} from "vuex"

  import netlifyIdentity from "netlify-identity-widget"

  export default {
    name: "NavMenu",
    methods: {
      ...mapActions("auth", [
        "attemptLogout"
        ]),
      ...mapMutations("auth", ["SET_CURRENT_USER"]),
      openNetlifyAuth(){
        netlifyIdentity.open();
      }
    },
     mounted () {
      netlifyIdentity.init({
        container: '#netlify-auth' // defaults to document.body,
      });

    netlifyIdentity.on('init', user => {
      console.log('init', user)
      
      });
    netlifyIdentity.on('login', user => {
      console.log('login', user)
      this.SET_CURRENT_USER(user)
      this.$router.push(this.$route.query.redirect || "/");
        
      });
    netlifyIdentity.on('logout', () => console.log('Logged out'));

    netlifyIdentity.on('open', () => {
      console.log('Widget opened')
      
      });
        
  },

  }
</script>

<style lang="scss" scoped>

</style>