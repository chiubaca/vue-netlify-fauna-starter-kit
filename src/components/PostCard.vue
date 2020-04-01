<template>
  <div v-if="deleted === false" class="post-card">
    <span class="title">{{ post.item.data.title }} </span>
    <input
      v-model="updatedPost.title"
      v-focus
      class="title"
      type="text"
      :placeholder="post.item.data.title"
      @click="editMode = true"
      @keyup.enter="emitPostUpdate"
    />
    <input
      v-model="updatedPost.contents"
      class="contents"
      type="text"
      :placeholder="post.item.data.contents"
      @click="editMode = true"
      @keyup.enter="emitPostUpdate"
    />
    <button v-if="editMode" class="delete rnd-corner-a" @click="deleteJournal">
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
      },
      deleted: false
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
    },
    deleteJournal() {
      this.deleted = true;
      this.$emit("delete-post", this.post);
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
  box-shadow: 8px 8px 0px -4px rgba(0, 0, 0, 0.75);
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
    padding: 5px;
    text-transform: capitalize;
  }
  input[type="text"].title {
    text-align: center;
  }
  .contents {
    grid-area: content;
    margin: 20px;
    background-color: inherit;
  }
  input[type="text"].contents {
    text-align: center;
    padding: 0;
    border: none;
  }
  .delete {
    grid-area: delete;
    // margin-top: 22px;
  }
  .update {
    grid-area: update;
  }
}

.post-card:hover {
  box-shadow: 11px 11px 0px -4px rgba(0, 0, 0, 0.75);
}
</style>
