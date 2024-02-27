<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  background-color: #dccece;
  width: 50%;
  margin: 2rem auto;
  padding: 1rem;
}

@media (min-width: 360px) {
  main {
    width: 90%;
    /* height: 90%; */
  }
}
</style>
