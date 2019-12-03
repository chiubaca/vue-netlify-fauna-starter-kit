<template>
  <main class="home">
    <h2>🏠 This is the public home page</h2>
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
    ]),
    anotherWayToGetData(){
      return this.$store.getters["auth/testData"]
    }
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
  width:500px;
  
  span {
    background-color: red;
    padding:5px
  }

}
</style>
