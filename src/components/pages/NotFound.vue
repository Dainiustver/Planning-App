<template>
  <div class="notFoundCaption">
    <router-link to="/">
      ⚠️ Unfortunately, the page you are trying to access was not found. Click
      on this text (or use the navigation above) to go to Create New Project
      page. ⚠️
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.notFoundCaption {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
}

a {
  color: black;
}

@media (max-width: 1000px) {
  .notFoundCaption {
    font-size: 1.5rem;
  }
}
</style>
