<template>
  <div id="journal-background" class="space">
    <h1>Your Journals</h1>

    <div id="create-journal-container" class="shadow">
      <form id="create-new-journal">
        <input
          v-model="journal.title"
          required
          type="text"
          placeholder="Name of new journal"
        />
        <input
          name="create journal"
          value="Create Journal"
          type="button"
          @click="submit()"
        />
      </form>
    </div>

    <div id="journals-container">
      <JournalCard
        v-for="(item, index) in allJournals"
        :key="index"
        :journal-data="item"
        @delete-journal="deleteJournal"
      />
    </div>
  </div>
</template>

<script>
import {
  createJournal,
  getJournals,
  deleteJournal
} from "../models/JournalsModel";
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
    deleteJournal(journal) {
      console.log("Deleting journal...", journal.ref.value.id);
      deleteJournal(journal.ref.value.id)
        .then(resp => {
          console.log("response back...", resp);
        })
        .catch(err => {
          console.error("problem deleting", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#create-journal-container {
  background: #f5f5f5;
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
    background: #f5f5f5;
  }
}

#journals-container {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
}

#journals-background {
  background-color: black;
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
