<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  font: inherit;
  font-size: 1.25rem;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin-left: 15px;
  background-color: #d2691e;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #692a0c;
}
</style>
