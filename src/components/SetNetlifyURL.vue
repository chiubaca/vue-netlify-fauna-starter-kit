<template>
  <div class="dev-check stack">
    👋 Hey fellow developer! It looks like you're in a local development
    environment. Ensure Netlify Identity is enabled and you have set your
    assigned Netlify URL here:
    <div id="input-container">
      <span>https://</span>
      <input
        v-model="netlifyURL"
        type="text"
        placeholder="YOUR-NETLIFY-SITE.netlify.com"
      />
    </div>

    <button type="button" @click="setURL()">SET</button>
    <span v-if="siteURL" id="url-hint">Saved URL: {{ siteURL }} </span>
    ⚠️ Note: Logging in via an external provider will redirect you back to your
    live Netlify URL.
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

<style scoped>
.dev-check {
  background: beige;
  padding: 20px;
}

#input-container {
  display: flex;
  justify-content: start;
  align-items: baseline;
}

#input-container span {
  background: #a7dea7;
  padding: 1px;
  border-bottom: 3px solid rgb(44, 44, 44);
}

#input-container input {
  width: 100%;
}

#url-hint {
  padding: 10px;
  margin: 10px 0 10px 0;
  background-color: burlywood;
}

input {
  margin-top: 10px;
}
</style>
