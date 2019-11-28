<template>
  <div>
    <h1>Your Profile</h1>
    <p>🔒 You should be logged in to see this page 🔒</p>
    {{currentUser}}
    
    <button @click="updateUserMetaData">
      Update user meta data
    </button>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex"
  export default {
    computed: {
      ...mapGetters("auth",[
        "currentUser"
      ]) 
    },
    methods: {
      ...mapActions("auth",[
        "updateUserMetaData"
      ])
    },
  }
</script>

<style lang="scss" scoped>

</style>