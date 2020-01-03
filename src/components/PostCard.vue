<template>
  <div class="post-card">
    <span>Title: {{this.cardData.title}} </span>
    <span>Contents:{{this.cardData.contents}} </span>
    <!-- {{this.cardData}} -->
  </div>
</template>

<script>

export default {
  props: {
    cardData: {
      type: Object,
    },
  },


};

</script>

<style lang="scss" scoped>
  .post-card {
    display: flex;
    flex-direction: column;
    border-style: solid;
    width:500px;
  }

</style>