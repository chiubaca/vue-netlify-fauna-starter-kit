<template>
  <div class="space">
    <h1>Your Profile</h1>
    <p>🔒 You should be logged in to see this page 🔒</p>
    <div class="profile-panel">
      <ul v-if="currentUser">
        <li>goTrue Logged in : {{ netlifyUserLoggedIn }}</li>
        <li>Current_UserID : {{ currentUser.id }}</li>
        <li>Current_Email : {{ currentUser.email }}</li>
        <li>app_metadata : {{ currentUser.app_metadata }}</li>
        <li>user_metadata : {{ currentUser.user_metadata }}</li>
      </ul>

      <div v-else>No data to show</div>

      <button @click="getUserJWTToken">Get User JWT</button>
      <button @click="getCurrentUser">Get User Object</button>
      <!-- Bug: logging out throws a console error, likely to do with Vue not handling the state change correctly -->
      <button @click="attemptLogout()">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      mutationInput: null,
      actionInput: null
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser", "netlifyUserLoggedIn"])
  },
  methods: {
    ...mapActions("auth", [
      "updateUserMetaData",
      "getUserJWTToken",
      "getCurrentUser",
      "attemptLogout"
    ])
  }
};
</script>

<style scoped>
.profile-panel {
  border-width: 1px;
  border-style: dashed;
  right: 30%;
  /* position: fixed; */
  right: 0;
  bottom: 50;
  /* width: 70%; */
  word-wrap: break-word;
}
</style>
