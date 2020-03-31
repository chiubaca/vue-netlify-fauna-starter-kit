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

  height: 50px;
  text-align: center;
  color: #fff;
  background-color: black;
  a {
    text-decoration: none;
    text-decoration: underline;
    color: #fff;
    margin-left: 5px;
  }
  a:hover {
    background-color: rgb(52, 52, 255);
  }
}
</style>
