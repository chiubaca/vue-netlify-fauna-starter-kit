<template>
  <main class="home">
    <h2>🏠 This is the public home page</h2>
    <div class="test-area">
      <h2>Vuex Test area</h2>
      Data From Vuex Store: <span> {{dataFromStore}} </span>
      <br/><br/>  
      Update via Mutation: 
      <input type="text" name="fname"><button>Commit</button>
      <br/><br/> 
      Update via Action: 
      <input type="text" name="fname"><button>Dispatch</button> 
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  computed: {
    dataFromStore() {
      return this.$store.state.auth.testData 
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.test-area {
  background-color: beige;
  height: 200px;
  width:500px;
  
  span {
    background-color: red;
    padding:5px
  }

}
</style>
