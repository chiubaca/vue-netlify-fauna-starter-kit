<template>
  <div class="journal-card shadow">
    <router-link :to="{ path: `journals/${journal.item.ref.value.id}/posts` }">
      {{ journal.item.data.title }}
    </router-link>
    <button class="update rnd-corner-a">update</button>
    <router-link
      class="posts rnd-corner-b"
      tag="button"
      :to="{ path: `journals/${journal.item.ref.value.id}/posts` }"
    >
      👆 See all posts
    </router-link>
    <button
      class="delete rnd-corner-a"
      @click="$emit('delete-journal', journal)"
    >
      🗑️ Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    journal: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.journal-card {
  background: var(--app-secondary-background-color);
  display: grid;
  width: 100%;
  text-align: center;
  margin: 20px;
  border-radius: 15px;
  height: 150px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ".  .  update"
    ". name ."
    "delete . posts";
  a {
    grid-area: name;
    text-transform: capitalize;
  }
  button.posts {
    display: flex;
    grid-area: posts;
    margin: 0px;

    display: inline-block;
    padding: 4px;
  }
  button.delete {
    grid-area: delete;
  }
  button.update {
    grid-area: update;
  }
}
</style>
