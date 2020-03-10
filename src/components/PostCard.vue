<template>
  <div class="post-card shadow">
    <span class="title">{{ post.item.data.title }} </span>
    <input
      v-if="editMode"
      v-model="updatedPost.title"
      v-focus
      class="title"
      type="text"
      :placeholder="post.item.data.title"
    />
    <span class="contents">{{ post.item.data.contents }} </span>
    <input
      v-if="editMode"
      v-model="updatedPost.contents"
      class="contents"
      type="text"
      :placeholder="post.item.data.contents"
    />
    <button class="delete rnd-corner-a" @click="$emit('delete-post', post)">
      🗑️ Delete
    </button>
    <button class="update rnd-corner-b" @click="editMode = !editMode">
      ✏️ Edit
    </button>
    <button v-if="editMode" class="update rnd-corner-b" @click="emitPostUpdate">
      👍 Update
    </button>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      editMode: false,
      updatedPost: {
        title: "",
        contents: ""
      }
    };
  },
  beforeMount() {
    this.updatedPost = this.post.item.data;
  },
  methods: {
    emitPostUpdate() {
      this.editMode = false;
      //TODO: detect if anything has actually changed, as currently this is updating the db even if no changes were made
      this.$emit("update-post", {
        postRefID: this.post.item.ref.value.id,
        updatedPost: this.updatedPost
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.post-card {
  background: var(--app-secondary-background-color);
  display: grid;
  min-width: 20rem;
  min-height: 10rem;
  text-align: center;
  border-radius: 15px;
  grid-template-areas:
    "title  title  title"
    "content content content"
    "delete . update";
  .title {
    grid-area: title;
    border-radius: 15px 15px 0px 0px;
    background-color: rgb(209, 209, 209);
    border-bottom: black;
    border-bottom: 3px solid black;
    padding: 10px;
    text-transform: capitalize;
  }
  .contents {
    grid-area: content;
    margin: 20px;
  }
  .delete {
    grid-area: delete;
    // margin-top: 22px;
  }
  .update {
    grid-area: update;
  }
}
</style>
