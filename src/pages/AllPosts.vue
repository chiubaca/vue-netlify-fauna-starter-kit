<template>
  <main>
    <div class="space">
      <h1>📝 Your Posts</h1>
      <div id="create-post-container" class="shadow">
        <form class="new-post">
          <input v-model="post.title" type="text" placeholder="Title" />
          <textarea
            v-model="post.contents"
            type="text"
            placeholder="What's on your mind?"
          />
          <input
            type="button"
            name="add post"
            value="Add Post"
            @click="submit()"
          />
        </form>
      </div>
    </div>

    <div id="posts-container">
      <PostCard
        v-for="(item, index) in allPosts"
        :key="index"
        :post="{ item, index }"
        @delete-post="deletePost"
        @update-post="updatePost"
      />
    </div>
  </main>
</template>

<script>
import {
  addPost,
  getPosts,
  deletePost,
  updatePost
} from "../models/PostsModel";
import PostCard from "../components/PostCard.vue";

export default {
  components: {
    PostCard
  },

  data: function() {
    return {
      post: {
        title: "",
        contents: ""
      },
      allPosts: []
    };
  },
  beforeMount() {
    getPosts(this.$route.params.id).then(resp => {
      console.log("Got posts from DB", resp.data);
      this.allPosts = resp.data;
    });
  },
  methods: {
    /**
     * Sumbit a new post to db
     */
    submit() {
      addPost(this.post, this.$route.params.id)
        .then(resp => {
          console.log("post obj", resp);
          alert("Created a new post");
          this.allPosts.push(resp);
          if (resp.msg) {
            alert(resp.message);
          }
        })
        .catch(err => {
          alert("there was a problem adding post");
          console.error(err);
        });
    },
    /**
     * @param {object} post - fauna post object
     */
    deletePost(post) {
      deletePost(post.item.ref).then(resp => {
        console.log("Deleted post", resp);
      });
    },
    /**
     * @param {object} updatedPost - fauna post object with modified data
     */
    updatePost({ postRefID, updatedPost }) {
      updatePost(postRefID, updatedPost)
        .then(resp => {
          console.log("Post Updated", resp);
        })
        .catch(err => {
          console.error("problem updating post", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#create-post-container {
  background: var(--app-secondary-background-color);
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 15px;

  input[type="text"] {
    background: var(--app-secondary-background-color);
  }
  textarea {
    background: var(--app-secondary-background-color);
    resize: vertical;
  }
}

.new-post {
  display: flex;
  flex-direction: column;
}

.post-card {
  margin: 20px;
}

#posts-container {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
}

input[type="button"] {
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 0 0px 15px 15px;
  background: #a7a7a7;
}
input[type="button"]:hover {
  background: rgb(158, 158, 158);
}

input[type="button"]:active {
  background: rgb(112, 112, 112);
  box-shadow: 0px 0px 0px -4px rgba(0, 0, 0, 0.75);
}
</style>
