<template>
  <div class="space">
    <form
      onsubmit="return false"
      class="stack"
      @keyup.enter="requestPasswordRecover(crendentials.email)"
    >
      <h2>What account are you trying to recover?</h2>
      <label for="email">Email</label>
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
