<template>
  <div class="post-card shadow">
    <span>Title: {{ cardData.data.title }} </span>
    <span>Contents:{{ cardData.data.contents }} </span>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.post-card {
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
}
</style>
