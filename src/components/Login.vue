<template>
  <div class="login-page">
    <div class="form">
      
      <form v-if="mode === 'register'" class="register-form stack">
        <h2>👋 Register Here</h2>
        <input type="text" placeholder="name" v-model="crendentials.name" />
        <input type="text" placeholder="email address" v-model="crendentials.email" />
        <input type="password" placeholder="password" v-model="crendentials.password" />
        <button type="button" @click="signup()">Sign Up</button>
        <p class="message">
          Already registered?
          <a @click="toggleMode" href="#">Sign In</a>
        </p>
      </form>

      <form v-else class="login-form stack">
        <h2>🔐 Login Here</h2>
        <input type="text" placeholder="username" v-model="crendentials.email" />
        <input type="password" placeholder="password" v-model="crendentials.password" />
        <button type="button" @click="login()">login</button>
        <div @click="loginExternal()"> Sign in with Google </div>
        <p class="message">
          Not registered?
          <a @click="toggleMode" href="#">Create an account</a>
        </p>

        <div v-if="isDevEnvironment"> 
          Looks like your in a dev environment. Ensure Netlify Identity is enable and set your netlify URL here:
          <input type="text" placeholder="https://<YOUR-NETLIFY-SITE>.netlify.com/" v-model="netlifyURL" />  
        </div>

      </form>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      crendentials: {
        name: "",
        password: "",
        email: ""
      },
      mode: "login",
      netlifyURL:""
    };
  },
  methods: {
    ...mapActions("auth", ["attemptLogin", "attemptSignup", "attemptExternalLogin"]),
    toggleMode() {
      if (this.mode === "register") {
        this.mode = "login";
      } else {
        this.mode = "register";
      }
    },
    signup() {
      this.attemptSignup(this.crendentials)
        .then((response) => {
          alert(`Confirmation email has been sent to you! ${response.id}`);
          console.log(response)
        })
        .catch(error =>{
          alert(`Somethings gone wrong signing up.
                 Error: ${error}`)
          console.error(error, "Somethings gone wrong signing up")
        });
    },
    login() {

      // let token = decodeURIComponent(window.location.search).substring(1).split("confirmation_token=")[1];

      this.attemptLogin({...this.crendentials})
        .then(() => {
          alert(`You have signed in!`);
          this.$router.push(this.$route.query.redirect || "/");
        })
        .catch(error => {
          alert(`Somethings gone wrong logging in.
                 Error: ${error}`)
          console.error(error, "Somethings gone wrong logging in")
        });
    },
    loginExternal(){
      this.attemptExternalLogin("Google")
    }
  },
  computed: {
    ...mapGetters("app", ["isDevEnvironment"])
  },
  watch:{
    netlifyURL:function(newChange){
      this.$store.commit("app/SET_SITE_URL", newChange)
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