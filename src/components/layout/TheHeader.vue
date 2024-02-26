<template>
  <header>
    <router-link to="/">
      <h1>Planning App</h1>
    </router-link>
    <div>
      <router-link to="/new-project">
        <base-button>New Project</base-button>
      </router-link>
      <router-link to="/browse-projects">
        <base-button>Browse Projects</base-button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right bottom, #773202, #a75936);
  padding: 20px 40px;
  color: white;
}

header h1 {
  margin: 0;
  font-size: 2rem;
  color: #f5deb3;
}
</style>
