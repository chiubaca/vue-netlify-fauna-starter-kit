<template>
  <main>
    <div class="space">
      <h1>📔 Your Journals</h1>

      <div id="create-journal-container" class="shadow">
        <!-- fix to stop page from refreshing when hitting enter:
           https://stackoverflow.com/questions/2215462/html-form-when-i-hit-enter-it-refreshes-page -->
        <form id="create-new-journal" onkeypress="return event.keyCode != 13">
          <input
            v-model="journal.title"
            required
            type="text"
            placeholder="Name of new journal"
            @keyup.enter="submit()"
          />
          <input
            name="create journal"
            value="Create Journal"
            type="button"
            @click="submit()"
          />
        </form>
      </div>
    </div>
    <div id="journals-container">
      <JournalCard
        v-for="(item, index) in allJournals"
        :key="index"
        :journal="{ item, index }"
        @delete-journal="deleteJournal"
        @update-journal="updateJournalTitle"
      />
    </div>
  </main>
</template>

<script>
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournalTitle
} from "../models/JournalsModel";
import JournalCard from "../components/JournalCard.vue";

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
    getJournals()
      .then(resp => {
        console.log("Got journals from DB", resp.data);
        this.allJournals = resp.data;
      })
      .catch(err => console.error("problem getting journals", err));
  },
  methods: {
    /**
     * Sumbit a new post to db
     */
    submit() {
      createJournal(this.journal)
        .then(resp => {
          alert("New journal created");
          console.log("journal obj", resp);
          this.allJournals.push(resp);
          if (resp.msg) {
            alert(resp.message);
          }
        })
        .catch(err => {
          alert("There was a problem creating your journal");
          console.error(err);
        });
    },
    /**
     * delete journal
     *  @param {object} journal - object containing index journal and fauna db journal object
     */
    deleteJournal(journal) {
      deleteJournal(journal)
        .then(resp => {
          console.log("Journal deleted!", resp);
        })
        .catch(err => {
          console.error("problem deleting", err);
        });
    },
    /**
     * update a journal
     * @param {object} journal - object containing new journla title and fauna db journal object
     */
    updateJournalTitle({ journalRefID, newJournalTitle, index }) {
      console.log(
        "Updating new journal title to ",
        newJournalTitle,
        journalRefID
      );
      updateJournalTitle(journalRefID, newJournalTitle)
        .then(() => {
          this.allJournals[index].data.title = newJournalTitle;
        })
        .catch(err => {
          console.error("problem updating journal", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#journals-background {
  max-width: 28rem;
  padding: 1rem;
  margin: 1rem;
}

#create-journal-container {
  background: var(--app-secondary-background-color);
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 15px;
  #create-new-journal {
    display: flex;
    flex-direction: column;
  }

  input[type="text"] {
    background: var(--app-secondary-background-color);
  }
}

#journals-container {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
}

input[type="button"] {
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 0 0px 15px 15px;
  background: #a7a7a7;
}
input[type="button"]:hover {
  background: rgb(158, 158, 158);
}

input[type="button"]:active {
  background: rgb(112, 112, 112);
  box-shadow: 0px 0px 0px -4px rgba(0, 0, 0, 0.75);
}
</style>
