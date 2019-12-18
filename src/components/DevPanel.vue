<template>
  <div>
    <div class="dev-panel">
      Dev Panel test
      <h2>User Data Getters</h2>
      
      goTrue Logged in : {{netlifyUserLoggedIn}}
       <br/>
      Current_UserID : {{currentUser.id}}
       <br/>
      Current_Email : {{currentUser.email}}
       <br/>
      app_metadata : {{currentUser.app_metadata}}
      
      <br/>
      
      <button @click="updateUserMetaData">Update user meta data</button>
      <button @click="triggerNetlifyFunction">trigger netlify signup function</button>
      <button @click="getUserJWTToken">Get User JWT</button>
      <button @click="getCurrentUser">Get User Object</button>

    </div>
  </div>
</template>

<script>
import { mapGetters , mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      mutationInput: null,
      actionInput: null
    };
  },
  methods: {
    ...mapActions("auth", ["updateUserMetaData" ,"getUserJWTToken","getCurrentUser"]),
    triggerNetlifyFunction() {
      let userObject =  { 
            user:{
              id: 'test-id',//id created by netlify
              user_metadata: { 
              full_name: 'local sdev testing' 
            }
        }
      };

      let data = JSON.stringify(userObject);

      fetch(
        "http://localhost:34567/.netlify/functions/identity-external-signup",
        {
          method: "POST",
          body: data
        }
      )
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          alert(JSON.stringify(data));
        });
    }
    
  },
  computed: {
    ...mapGetters("auth", ["currentUser", "netlifyUserLoggedIn"])
  }
};
</script>


<style scoped>
.dev-panel {
  background: #7676b6;
  border-width: 1px;
  border-style: dashed;
  right: 30%;
  /* position: fixed; */
  right: 0;
  bottom: 50;
  /* width: 70%; */
  word-wrap: break-word;
}
</style>