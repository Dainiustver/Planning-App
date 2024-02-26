<template>
  <div :class="{ background: true, front: isSaving }"></div>
</template>

<script>
export default {
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
  background-image: url("https://www.theopennotebook.com/wp-content/uploads/2016/03/shutterstock_182727164.jpg");
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
}

.front {
  z-index: 1;
  filter: blur(10px);
}
</style>
