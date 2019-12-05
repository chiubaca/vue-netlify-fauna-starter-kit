<template>
  <div>
    <h1>Your Profile</h1>
    <p>🔒 You should be logged in to see this page 🔒</p>

    
    <button @click="updateUserMetaData">
      Update user meta data
    </button>

  </div>
</template>

<script>
  import {mapActions} from "vuex"
  export default {

    methods: {
      ...mapActions("auth",[
        "updateUserMetaData"
      ])
    },
  }
</script>

<style lang="scss" scoped>

</style>