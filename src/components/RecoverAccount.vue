<template>
  <div class="space">
    <form
      onsubmit="return false"
      class="stack"
      @keyup.enter="requestPasswordRecover(crendentials.email)"
    >
      <h2>Forgot Password?</h2>
      <p>
        Enter the email address you used when you joined and we’ll send you
        instructions to reset your password.
      </p>
      <p>
        For security reasons, we do NOT store your password. So rest assured
        that we will never send your password via email.
      </p>
      <label for="email">Email Address</label>
      <input
        id="email"
        v-model="crendentials.email"
        type="text"
        placeholder="hey@email.com"
      />
      <button type="button" @click="requestPasswordRecover(crendentials.email)">
        Recover Account
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RecoverAccount",
  data() {
    return {
      crendentials: {
        email: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["requestPasswordRecover"])
  }
};
</script>

<style lang="scss" scoped></style>
