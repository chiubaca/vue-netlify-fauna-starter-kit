<template>
  <div class="journal-card shadow">
    <router-link :to="{ path: `journals/${journal.item.ref.value.id}/posts` }">
      {{ journal.item.data.title }}
    </router-link>
    <router-link
      tag="p"
      :to="{ path: `journals/${journal.item.ref.value.id}/posts` }"
    >
      👆 See all posts
    </router-link>
    <button @click="$emit('delete-journal', journal)">
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
  flex-shrink: 5;

  display: grid;
  width: 500px;
  text-align: center;
  margin: 20px;
  border-radius: 15px;
  height: 90px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ".  .  ."
    ". name ."
    "delete . link";
  a {
    grid-area: name;
    text-transform: capitalize;
  }
  p {
    display: flex;
    grid-area: link;
    background: #b4a695;
    cursor: pointer;
    margin: 0px;
    border-radius: 15px 0px 14px 0px;
    display: inline-block;
    padding: 4px;
  }
  button {
    border: none;
    grid-area: delete;
    border-radius: 0px 15px 0px 15px;
  }
}
</style>
