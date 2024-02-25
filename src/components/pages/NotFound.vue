<template>
  <div class="flex">
    <div>
      <span>
        ⚠️ Unfortunately, the page you are trying to access was not found. Click
      </span>
      <router-link to="/">here</router-link>
      <span> (or on the navigation above) to go to main page. ⚠️</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex {
  align-self: center;
  text-align: center;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
}
</style>
