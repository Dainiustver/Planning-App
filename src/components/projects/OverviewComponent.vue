<template>
  <div class="overview-container">
    <div>
      <div
        v-if="!noSections"
        v-for="section in sections"
        :key="section.sectionName"
        class="section-overview"
      >
        <strong>{{ capitalizeFirstWord(section.sectionName) }}:</strong>
        <span>{{ section.sectionData }}</span>
      </div>
      <p v-else>Currently there are no sections.</p>
      <base-button v-if="!noSections" @click="saveProjectToLocalStorage"
        >Confirm changes (applies to all edits, including in other
        projects)</base-button
      >
      <base-spinner v-if="isSaving"></base-spinner>
    </div>
  </div>
</template>

<script>
import BaseSpinner from "../ui/BaseSpinner.vue";
export default {
  props: ["sections"],
  methods: {
    saveProjectToLocalStorage() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
      this.$store.dispatch("setProjects");

      setTimeout(() => {
        this.$store.dispatch("projectSettingComplete");
      }, 2000);
    },

    capitalizeFirstWord(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  computed: {
    projects() {
      return this.$store.getters.projects;
    },
    noSections() {
      return this.sections.length === 0;
    },
    isSaving() {
      return this.$store.getters.savingProjects;
    },
  },
  components: { BaseSpinner },
};
</script>

<style scoped>
.overview-container {
  padding: 2rem;
  background-color: #f0f0f0;
  min-height: 50vh;
  margin-top: 2rem;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.section-overview {
  margin-bottom: 2rem;
  line-height: 1.4;
  word-break: break-all;
}

.section-overview strong {
  margin-right: 0.5rem;
  color: #333;
}
</style>
