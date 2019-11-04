<template>
<div class="login-page">
  <div class="form">

    <form v-if="mode === 'register'" class="register-form">
      <h2>👋 Register Here</h2>
      <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    
    <form v-else class="login-form">
      <h2>🔐 Login Here</h2>
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
    </form>
  
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        mode: "login"
      }
    },
    
  }
</script>

<style scoped>

</style>