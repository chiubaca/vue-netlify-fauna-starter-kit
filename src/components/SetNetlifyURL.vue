<template>
  <div class="dev-check">
    Looks like your in a dev environment. Ensure Netlify Identity is enable and set your netlify URL here:

    <input type="text" placeholder="<YOUR-NETLIFY-SITE>.netlify.com" v-model="netlifyURL" />  
    <button type="button" @click="setURL()">SET</button>
    <span>SetURL: {{siteURL}} </span>  
  </div>
</template>

<script>
import { mapGetters} from "vuex";

export default {
  name: "SetNetlifyURL",
  data() {
    return {
      netlifyURL:""
    };
  },
  methods: {
    setURL(){
      this.$store.commit("app/SET_SITE_URL", this.netlifyURL)
    }
  },
  computed: {
    ...mapGetters("app", ["isDevEnvironment", "siteURL"])
  },

};
</script>

<style scoped>

</style>