<template>
  <div>
    <h1>Add A New Post</h1>

    <form class="new-post">
        <input type="text" placeholder="Title" v-model="post.title" />
        <textarea type="text" placeholder="What's on your mind?" v-model="post.contents" />
        <button type="button" @click="submit()">Submit</button>
    </form>

  </div>
</template>

<script>
import {AddPost} from "../models/PostsModel"

export default {

  data() {
    return {
      post: {
        title:"",
        contents:""
      }
    }
  },
  methods: {
    /**
     * Sumbit a new post to db
     */
    submit() {
      console.log("Post Submitted", this.post)
   
      AddPost()
      .then(resp => {
        alert(resp.message)
        console.log(resp)
      })
      .catch(err => {
        alert("there was a problem adding post")
        console.error(err)
      })
    }
  
  }
};

</script>

<style lang="scss" scoped>

.new-post{
  width:400px;
  display: flex;
  flex-direction: column

}
</style>