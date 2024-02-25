<template>
  <the-header></the-header>
  <the-background></the-background>
  <the-content></the-content>
</template>

<script>
import axios from "axios";
import TheHeader from "./components/layout/TheHeader.vue";
import TheBackground from "./components/layout/TheBackground.vue";
import TheContent from "./components/layout/TheContent.vue";

export default {
  async beforeCreate() {
    const result = await axios.get(
      "https://planning-app-c6aef-default-rtdb.europe-west1.firebasedatabase.app/projects.json"
    );

    const mapped = [];

    for (const [key, value] of Object.entries(result.data || [])) {
      mapped.push({
        ...value,
        firebaseId: key,
      });
    }

    // Hacky hacky
    for (const project of mapped) {
      this.$store.dispatch("createProject", project);
    }
  },
  components: { TheHeader, TheBackground, TheContent },
};
</script>
