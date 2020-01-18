<template>
  <div class="post-card">
    <span>Title: {{cardData.data.title}} </span>
    <span>Contents:{{cardData.data.contents}} </span>
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