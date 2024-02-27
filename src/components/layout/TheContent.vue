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
  }
}

@media (min-width: 1000px) {
  main {
    width: 70%;
  }
}

@media (min-width: 1400px) {
  main {
    width: 60%;
  }
}
</style>
