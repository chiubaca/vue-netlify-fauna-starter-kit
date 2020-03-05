<template>
  <div class="journal-card shadow">
    <router-link :to="{ path: `journals/${journalData.ref.value.id}/posts` }">
      {{ journalData.data.title }}
    </router-link>
    <router-link
      tag="p"
      :to="{ path: `journals/${journalData.ref.value.id}/posts` }"
    >
      Click for all posts
    </router-link>
    <button @click="$emit('delete-journal', journalData)">
      Delete Journal
    </button>
  </div>
</template>

<script>
export default {
  props: {
    "journal-data": {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.journal-card {
  background: var(--app-secondary-background-color);
  flex-shrink: 5;
  cursor: pointer;
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
    grid-area: link;
    background: #b4a695;
    // padding: 5px 2px 6px 25px;
    margin: 0px;
    border-radius: 15px 0px 14px 0px;
    font-size: 0.8rem;
    display: inline-block;
    // top: 0px;
    // right: 0;
  }
  button {
    border: none;
    grid-area: delete;
    border-radius: 0px 15px 0px 15px;
  }
}
</style>
