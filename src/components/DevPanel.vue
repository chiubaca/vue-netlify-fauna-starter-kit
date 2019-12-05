<template>
  <div>
    <div class="dev-panel">
      Dev Panel
      <h2>Vuex Getters</h2>
      Login Token: {{testData}}
      <br/>
      Current_User : {{currentUser}}

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      mutationInput: null,
      actionInput: null
    };
  },
  computed: {
    ...mapGetters("auth", ["testData" , "currentUser"])
  }
};
</script>


<style scoped>
.dev-panel {
  background: #7676b6;
  border-width: 1px;
  border-style: dashed;
  right: 30%;
  position: fixed;
  right: 0;
  bottom: 50;
  width: 70%;
  word-wrap: break-word;
}
</style>