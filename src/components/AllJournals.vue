<template>
  <div class="space">
    <h1>Your Journals</h1>
    <div id="journals-container">
      <JournalCard
        v-for="(item, index) in allJournals"
        :key="index"
        :journal-data="item"
      />
    </div>

    <h2>Create A New Journal</h2>
    <form class="create-new-journal">
      <input v-model="journal.title" type="text" placeholder="Title" />
      <button type="button" @click="submit()">Create</button>
    </form>
  </div>
</template>

<script>
import { createJournal, getJournals } from "../models/JournalsModel";
import JournalCard from "./JournalCard.vue";

export default {
  components: {
    JournalCard
  },

  data: function() {
    return {
      journal: {
        title: ""
      },
      allJournals: []
    };
  },
  beforeMount() {
    getJournals().then(resp => {
      console.log("Got journals from DB", resp.data);
      this.allJournals = resp.data;
    });
  },
  methods: {
    /**
     * Sumbit a new post to db
     */
    submit() {
      console.log("Journal Created", this.journal);
      createJournal(this.journal)
        .then(resp => {
          alert(resp.message);
          console.log(resp);
        })
        .catch(err => {
          alert("There was a problem creating your journal");
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.create-new-journal {
  width: 400px;
  display: flex;
  flex-direction: column;
}

.journal-card {
  margin: 20px;
}

#journals-container {
  display: flex;
}
</style>
