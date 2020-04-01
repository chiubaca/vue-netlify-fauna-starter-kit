<template>
  <div v-if="deleted === false" ref="journalCard" class="journal-card">
    <input
      ref="editTitle"
      v-model="journalTitle"
      readonly
      type="text"
      @keyup.enter="emitNewJournalTitle"
      @click="enableEditMode"
    />

    <button class="update rnd-corner-a" @click="enableEditMode">
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
    <button v-if="editMode" class="delete rnd-corner-a" @click="deleteJournal">
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
      // when in edit mode, the input for title become editable and toggle the update button
      editMode: false,
      // on mounted, this hold the journal title and will save changes to the new title if it is edited
      journalTitle: "",
      // the card is hidden from view when the user deletes the card, this preserves component index.
      // if the index is not preserved this can cause the card state to get jumbled up and its very confusing for the end-user
      deleted: false
    };
  },
  mounted() {
    //set the journal title into view and into state
    this.journalTitle = this.journal.item.data.title;
    this.$refs.editTitle.value = this.journal.item.data.title;
  },
  methods: {
    enableEditMode() {
      this.editMode = true;
      // remove readonly mode so that the input is editable
      this.$refs.editTitle.removeAttribute("readonly");
      //set the value of the input so that the user can edit the existing title
      this.$refs.editTitle.value = this.journal.item.data.title;
      this.$refs.editTitle.focus();
    },
    emitNewJournalTitle() {
      this.editMode = false;
      this.$refs.editTitle.setAttribute("readonly", "true");

      this.$emit("update-journal", {
        newJournalTitle: this.journalTitle,
        journalRefID: this.journal.item.ref.value.id,
        index: this.journal.index
      });
    },
    deleteJournal() {
      this.$emit("delete-journal", this.journal.item);
      this.deleted = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.journal-card {
  cursor: pointer;
  background: var(--app-secondary-background-color);
  display: grid;
  text-align: center;
  margin: 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  box-shadow: 8px 8px 0px -4px rgba(0, 0, 0, 0.75);
  grid-template-areas:
    "info  .  update"
    "name name name"
    "delete . posts";

  a {
    grid-area: name;

    margin: 3rem;
  }
  input {
    grid-area: name;
    background: inherit;
    border: none;
    text-align: center;
    margin: 1.5rem;
    cursor: pointer;
    text-transform: capitalize;
    font-size: 1.2rem;
    font-weight: bold;
  }
  button.posts {
    display: flex;
    grid-area: posts;
    margin: 0px;
  }
  button.delete {
    grid-area: delete;
  }
  button.delete:hover {
    background-color: rgb(209, 100, 100);
  }
  button.update {
    grid-area: update;
  }
}

.journal-card:hover {
  box-shadow: 11px 11px 0px -4px rgba(0, 0, 0, 0.75);
}
</style>
