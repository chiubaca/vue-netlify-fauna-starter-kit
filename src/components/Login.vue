<template>
  <div class="login-page">
    <div class="form">
      <form v-if="mode === 'register'" class="register-form stack">
        <h2>👋 Register Here</h2>
        <input type="text" placeholder="name" v-model="crendentials.name" />
        <input type="password" placeholder="password" v-model="crendentials.password" />
        <input type="text" placeholder="email address" v-model="crendentials.email" />
        <button @click="signup()">Sign Up</button>
        <p class="message">
          Already registered?
          <a @click="toggleMode" href="#">Sign In</a>
        </p>
      </form>

      <form v-else class="login-form stack">
        <h2>🔐 Login Here</h2>
        <input type="text" placeholder="username" v-model="crendentials.email" />
        <input type="password" placeholder="password" v-model="crendentials.password" />
        <button @click="attemptLogin">login</button>
        <p class="message">
          Not registered?
          <a @click="toggleMode" href="#">Create an account</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      crendentials: {
        name: "",
        password: "",
        email: ""
      },

      mode: "register"
    };
  },
  methods: {
    ...mapActions("auth", ["attemptLogin", "attemptSignup"]),
    toggleMode() {
      if (this.mode === "register") {
        this.mode = "login";
      } else {
        this.mode = "register";
      }
    },
    signup() {
      this.attemptSignup(this.crendentials)
        .then(() => {
          alert("Confirmation email has been sent to you!");
        })
        .catch(error =>
          console.error(error, "Somethings gone wrong signing up")
        );
    },
    login() {
      this.attemptLogin();
    }
  },
  created() {}
};
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  width: 20%;
}
</style>