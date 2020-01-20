<template>
  <div class="dev-check">
    Looks like your in a dev environment. Ensure Netlify Identity is enable and
    set your netlify URL here:

    <input
      v-model="netlifyURL"
      type="text"
      placeholder="<YOUR-NETLIFY-SITE>.netlify.com"
    />
    <button type="button" @click="setURL()">SET</button>
    <span v-if="siteURL">Saved URL: {{ siteURL }} </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SetNetlifyURL",
  data() {
    return {
      netlifyURL: ""
    };
  },
  computed: {
    ...mapGetters("app", ["isDevEnvironment", "siteURL"])
  },
  methods: {
    setURL() {
      this.$store.commit("app/SET_SITE_URL", this.netlifyURL);
    }
  }
};
</script>

<style scoped></style>
