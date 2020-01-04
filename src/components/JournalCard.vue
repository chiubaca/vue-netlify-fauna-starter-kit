<template>
  <div class="journal-card">
    <span>{{this.journalData.title}} </span>
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