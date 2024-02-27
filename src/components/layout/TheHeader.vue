<template>
  <header>
    <router-link to="/">
      <h1>Planning App</h1>
    </router-link>
    <div class="button__container">
      <router-link to="/new-project">
        <base-button class="button">New Project</base-button>
      </router-link>
      <router-link to="/browse-projects">
        <base-button class="button">Browse Projects</base-button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-image: linear-gradient(to right bottom, #773202, #a75936);
  color: white;
}

header h1 {
  color: #f5deb3;
}

@media (min-width: 360px) {
  header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem;
  }
  header h1 {
    font-size: 2rem;
    width: 10rem;
    text-align: center;
  }

  .button__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 5rem;
    width: 10rem;
  }
  .button {
    font-size: 0.8rem;
    margin: 0.2rem 0rem;
  }
}

@media (min-width: 700px) {
  .button__container {
    flex-direction: row;
    width: 18rem;
  }
  .button {
    font-size: 1.2rem;
    margin: 0rem 0.5rem;
  }
}
</style>
