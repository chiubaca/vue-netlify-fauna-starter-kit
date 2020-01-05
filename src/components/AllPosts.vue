<template>
  <div>
  
    <h1>Your Posts</h1>

    <div class="dev-stuff">
      Journal ID: {{this.$route.params.id}}
    </div>

    <div id="posts-container">
      <PostCard
        v-for="(item, index) in this.allPosts"
        :key="index" 
        :card-data="item"/>
    </div>
      
    <h2>Add A New Post</h2>
    <form 
      class="new-post">
        <input type="text" placeholder="Title" v-model="post.title" />
        <textarea type="text" placeholder="What's on your mind?" v-model="post.contents" />
        <button type="button" @click="submit()">Submit</button>
    </form>
    
  </div>
</template>

<script>
import {addPost , getPosts} from "../models/PostsModel"
import PostCard from "./PostCard"

export default {
  components: {
    PostCard,
  },

  data: function() {
    return {
      post: {
        title:"",
        contents:""
      },
      allPosts:[]
    }
  },
  methods: {
    /**
     * Sumbit a new post to db
     */
    submit() {
      console.log("Post Submitted", this.post)
      addPost(this.post , this.$route.params.id)
      .then(resp => {
        alert(resp.message)
        console.log(resp)
      })
      .catch(err => {
        alert("there was a problem adding post")
        console.error(err)
      })
    }
  },
  beforeMount () {

  getPosts(this.$route.params.id)
  .then(resp => {
    console.log("posts data from DB", resp)
    this.allPosts = resp.data
  })
  },
};

</script>

<style lang="scss" scoped>

.new-post{
  width:400px;
  display: flex;
  flex-direction: column
}

.post-card {
  margin:20px;
}

#posts-container{
  display: flex;
}
</style>