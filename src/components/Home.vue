<template>
  <main class="home">
    <h2>🏠 This is the public home page</h2>
    <div class="test-area">
      <h2>Vuex Test area</h2>
      Data From Vuex Store: <span> {{testData}} </span>
      <br/><br/>  
      Update via Mutation: 
      <input
        v-model="mutationInput" 
        type="text" 
        name="fname"
      ><button @click="updateTestData(mutationInput)" >Commit</button>
      <br/><br/> 
      Update via Action: 
      <input
        v-model="actionInput"  
        type="text" 
        name="fname"
      ><button @click="updateTestDataAction(actionInput)">Dispatch</button> 
    </div>
  </main>
</template>

<script>
import { mapGetters , mapMutations , mapActions} from 'vuex'

export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      mutationInput: null,
      actionInput:null
    }
  },
  computed: {
    ...mapGetters("auth",[
      "testData"
    ])
  },
  methods: {
    ...mapMutations("auth",[
      "updateTestData"
    ]),
    ...mapActions("auth", [
      "updateTestDataAction"
    ])
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
