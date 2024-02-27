<template>
  <div :class="{ background: true, front: isSaving }"></div>
</template>

<script>
export default {
  watch: {
    isSaving(newValue) {
      document.body.style.overflow = newValue ? "hidden" : "";
    },
  },
  computed: {
    isSaving() {
      return this.$store.getters.savingProjects;
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://i.ibb.co/WcNBCj9/background-image.jpg");
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
}

.front {
  z-index: 1;
  filter: blur(2px) drop-shadow(0px 0px 0px black);
}
</style>
