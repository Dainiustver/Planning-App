<template>
  <project-layout :id="id"></project-layout>
</template>

<script>
import ProjectLayout from "../layout/ProjectLayout.vue";

export default {
  components: { ProjectLayout },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style scoped></style>
