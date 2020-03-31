<template>
  <footer>
    made by<a href="https://twitter.com/chiubaca">chiubaca</a>
    <div id="links"></div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 0px 5px 0px 5px;
  border-radius: 15px 0 0 0;

  height: 50px;
  text-align: center;
  color: black;
  background-color: var(--app-secondary-background-color);
  a {
    text-decoration: none;
    text-decoration: underline;
    color: black;
    margin-left: 5px;
  }
  a:hover {
    background-color: rgb(52, 52, 255);
    border-radius: 5px;
  }
}
</style>
