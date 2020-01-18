<template>
  <div class="login-page">
    <div class="form">
      <form v-if="mode === 'register'" class="register-form stack">
        <h2>👋 Register Here</h2>
        <input v-model="crendentials.name" type="text" placeholder="name" />
        <input
          v-model="crendentials.email"
          type="text"
          placeholder="email address"
        />
        <input
          v-model="crendentials.password"
          type="password"
          placeholder="password"
        />
        <button type="button" @click="signup()">Sign Up</button>
        <p class="message">
          Already registered?
          <a href="#" @click="toggleMode">Sign In</a>
        </p>
      </form>

      <form v-else class="login-form stack">
        <h2>🔐 Login Here</h2>
        <input
          v-model="crendentials.email"
          type="text"
          placeholder="username"
        />
        <input
          v-model="crendentials.password"
          type="password"
          placeholder="password"
        />
        <button type="button" @click="login()">login</button>
        <div @click="loginExternal()">Sign in with Google</div>
        <p class="message">
          Not registered?
          <a href="#" @click="toggleMode">Create an account</a>
        </p>

        <SetNetlifyURL v-if="isDevEnvironment" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SetNetlifyURL from "./SetNetlifyURL.vue";

export default {
  name: "Login",
  components: {
    SetNetlifyURL
  },
  data() {
    return {
      crendentials: {
        name: "",
        password: "",
        email: ""
      },
      mode: "login"
    };
  },
  computed: {
    ...mapGetters("app", ["isDevEnvironment"])
  },
  methods: {
    ...mapActions("auth", [
      "attemptLogin",
      "attemptSignup",
      "attemptExternalLogin"
    ]),
    toggleMode() {
      if (this.mode === "register") {
        this.mode = "login";
      } else {
        this.mode = "register";
      }
    },
    signup() {
      this.attemptSignup(this.crendentials)
        .then(response => {
          alert(`Confirmation email has been sent to you! ${response.id}`);
          console.log(response);
        })
        .catch(error => {
          alert(`Somethings gone wrong signing up.
                 Error: ${error}`);
          console.error(error, "Somethings gone wrong signing up");
        });
    },
    login() {
      this.attemptLogin({ ...this.crendentials })
        .then(() => {
          alert(`You have signed in!`);
          this.$router.push(this.$route.query.redirect || "/");
        })
        .catch(error => {
          alert(`Somethings gone wrong logging in.
                 Error: ${error}`);
          console.error(error, "Somethings gone wrong logging in");
        });
    },
    loginExternal() {
      this.attemptExternalLogin("Google");
    }
  }
};
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  width: 20%;
}
</style>
