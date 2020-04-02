<template>
  <div id="profile-background" class="space">
    <h1>Your Profile</h1>
    <p>🔒 You should be logged in to see this page 🔒</p>
    <div class="profile-panel">
      <ul v-if="currentUser">
        <li>Username : {{ currentUser.user_metadata.full_name }}</li>
        <li>Email : {{ currentUser.email }}</li>
        <li>User ID : {{ currentUser.id }}</li>
      </ul>

      <div v-else>No data to show</div>

      <button @click="getUserJWTToken">Get User JWT</button>
      <button @click="getCurrentUser">Get User Object</button>
      <!-- Bug: logging out throws a console error, likely to do with Vue not handling the state change correctly.
       Related issue: https://github.com/chiubaca/vue-netlify-fauna-starter-kit/issues/12 -->
      <button @click="logout()">Log Out</button>
      <Modal
        button-text="Update User Data"
        :hidden-on-start="modalHiddenOnStart"
      >
        <h1>Update Your User Account Details</h1>
        <form class="stack" action="">
          <label for="name">User Name</label>
          <input
            id="name"
            v-model="userData.data.full_name"
            type="text"
            :placeholder="currentUser.user_metadata.full_name"
          />
          <span class="line">
            <label for="password">Password</label>
            <i
              :class="[passwordIcon]"
              @click="hidePassword = !hidePassword"
            ></i>
          </span>
          <input
            id="password"
            v-model="userData.password"
            :type="passwordType"
            placeholder="******"
          />

          <button type="button" @click="update(userData)">Update</button>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "../components/Modal.vue";

export default {
  name: "Profile",
  components: {
    Modal
  },
  data() {
    return {
      userData: {
        password: "",
        data: {
          full_name: ""
        }
      },
      modalHiddenOnStart: true,
      hidePassword: true
    };
  },

  computed: {
    ...mapGetters("auth", ["currentUser", "netlifyUserLoggedIn"]),
    passwordType() {
      return this.hidePassword ? "password" : "text";
    },
    passwordIcon() {
      return this.hidePassword ? "eye-open" : "eye-closed";
    }
  },
  created() {
    if (this.$route.query.showUpdateUserModal === "true") {
      this.modalHiddenOnStart = false;
    }
  },
  methods: {
    ...mapActions("auth", [
      "updateUserMetaData",
      "getUserJWTToken",
      "getCurrentUser",
      "attemptLogout",
      "updateUserAccount"
    ]),
    update(userData) {
      let data = userData;
      data.email = this.currentUser.email;
      console.log("whats the user data?", data);
      this.updateUserAccount(data)
        .then(() => {
          alert("You have updated your profile");
        })
        .catch(error => {
          alert("Sorry, something went wrong");
          console.error("Failed to update user account: %o", error);
        });
    },
    logout() {
      this.attemptLogout()
        .then(resp => {
          alert("logged out");
          location.reload();
          console.log("logged out", resp);
        })
        .catch(error => {
          alert("problem with logout");
          location.reload();
          console.error("problem with logout", error);
        });
    }
  }
};
</script>

<style scoped>
#profile-background {
  height: 100vh;
}
.profile-panel {
  border-width: 1px;
  border-style: dashed;
  right: 30%;
  right: 0;
  bottom: 50;
  word-wrap: break-word;
}

label {
  padding: 10px 5px 10px 0;
}

button {
  margin-top: 10px;
}
</style>
