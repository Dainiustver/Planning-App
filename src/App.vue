<template>
  <the-header></the-header>
  <the-background></the-background>
  <the-content></the-content>
</template>

<script>
import "./assets/style.css";
import TheHeader from "./components/layout/TheHeader.vue";
import TheBackground from "./components/layout/TheBackground.vue";
import TheContent from "./components/layout/TheContent.vue";

export default {
  beforeCreate() {
    if (localStorage.getItem("projects") !== null) {
      JSON.parse(localStorage.getItem("projects")).forEach((project) => {
        this.$store.dispatch("createProject", project);
      });
    }
  },

  components: { TheHeader, TheBackground, TheContent },
};
</script>
