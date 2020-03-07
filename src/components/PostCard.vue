<template>
  <div class="post-card shadow">
    <span>Title: {{ post.item.data.title }} </span>
    <span>Contents:{{ post.item.data.contents }} </span>
    <button @click="$emit('delete-post', post)">Delete post</button>
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
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  height: 90px;
}
</style>
