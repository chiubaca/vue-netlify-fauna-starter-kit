<template>
  <router-link
    tag="div"
    :to="{ path: `journals/${journalData.ref.value.id}/posts` }"
    class="journal-card shadow"
  >
    <span>{{ journalData.data.title }} </span>
    <p>Click for all posts</p>
  </router-link>
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
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  height: 90px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ".  .  ."
    ". name ."
    ". . link";
  span {
    grid-area: name;
    text-transform: capitalize;
  }
  p {
    grid-area: link;
    background: #b4a695;
    padding: 5px 2px 6px 25px;
    margin: 0px -10px -10px 38px;
    border-radius: 15px 0px 14px 0px;
  }
}
</style>
