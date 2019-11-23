<template>
  <div class="login-page">
    <div class="form">
      <form v-if="mode === 'register'" class="register-form stack">
        <h2>👋 Register Here</h2>
        <input type="text" placeholder="name" v-model="name" />
        <input type="password" placeholder="password" v-model="password" />
        <input type="text" placeholder="email address"  v-model="email" />
        <button>create</button>
        <p class="message">
          Already registered?
          <a @click="toggleMode" href="#">Sign In</a>
        </p>
      </form>

      <form v-else class="login-form stack">
        <h2>🔐 Login Here</h2>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>login</button>
        <p class="message">
          Not registered?
          <a @click="toggleMode" href="#">Create an account</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name:"",
      password:"",
      email:"",
      mode: "register"
    };
  },
  methods: {
    toggleMode() { 
      if (this.mode === "register") {
        this.mode = "login";
      } else {
        this.mode = "register";
      }
    }
  },
  created () {

  },
};
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  width: 20%;
}
</style>