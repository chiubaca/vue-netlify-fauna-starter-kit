<template>
  <div class="journal-card">
    <router-link 
      :to="{path: `journals/${this.journalData.ref.value.id}/posts`}" 
    >
      <span>{{this.journalData.data.title}} </span>
    </router-link>
  </div>
</template>

<script>

export default {
  props: {
    "journal-data": {
      type: Object,
    },
  },


};

</script>

<style lang="scss" scoped>
  .journal-card {
    display: flex;
    flex-direction: column;
    border-style: solid;
    width:500px;
    text-align: center
  }

</style>