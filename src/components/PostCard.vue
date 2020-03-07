<template>
  <div class="post-card shadow">
    <span class="title">{{ post.item.data.title }} </span>
    <span class="contents">{{ post.item.data.contents }} </span>
    <button class="delete rnd-corner-a" @click="$emit('delete-post', post)">
      🗑️ Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.post-card {
  background: var(--app-secondary-background-color);
  flex-shrink: 5;
  cursor: pointer;
  display: grid;
  width: 500px;
  text-align: center;
  border-radius: 15px;
  grid-template-areas:
    "title  title  title"
    "content content content"
    "delete . .";
  .title {
    grid-area: title;
    border-radius: 15px 15px 0px 0px;
    background-color: rgb(209, 209, 209);
    border-bottom: black;
    border-bottom: 3px solid black;
  }
  .contents {
    grid-area: content;
  }
  .delete {
    grid-area: delete;
    margin-top: 22px;
  }
}
</style>
