<template>
  <div class="journal-card shadow">
    <router-link
      v-if="editMode === false"
      :to="{ path: `journals/${journal.item.ref.value.id}/posts` }"
    >
      {{ journal.item.data.title }}
    </router-link>
    <input
      v-else
      v-model="newJournalTitle"
      v-focus
      required
      type="text"
      :placeholder="journal.item.data.title"
    />

    <button class="update rnd-corner-a" @click="editMode = !editMode">
      ✏️ Rename
    </button>

    <button
      v-if="editMode"
      class="update rnd-corner-a"
      @click="emitNewJournalTitle"
    >
      👍 Update
    </button>

    <router-link
      class="posts rnd-corner-b"
      tag="button"
      :to="{ path: `journals/${journal.item.ref.value.id}/posts` }"
    >
      👀 See posts
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
  },
  data() {
    return {
      editMode: false,
      newJournalTitle: null
    };
  },
  methods: {
    emitNewJournalTitle() {
      this.editMode = false;
      //if updated journal title is null or empty dont update
      if (!this.newJournalTitle) {
        return;
      }
      this.$emit("update-journal", {
        newJournalTitle: this.newJournalTitle,
        journalRefID: this.journal.item.ref.value.id,
        index: this.journal.index
      });
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
  justify-content: center;
  align-items: center;
  a {
    grid-area: name;
    text-transform: capitalize;
  }
  input {
    grid-area: name;
    border-bottom: 3px dotted grey;
    background: inherit;
    width: 100px;
  }
  button.posts {
    display: flex;
    grid-area: posts;
    margin: 0px;
    margin-top: 22px;
    display: inline-block;
  }
  button.delete {
    grid-area: delete;
    margin-top: 22px;
  }
  button.delete:hover {
    background-color: rgb(209, 100, 100);
  }
  button.update {
    grid-area: update;
    margin-bottom: 21px;
  }
}
</style>
