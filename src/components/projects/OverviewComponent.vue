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
      <base-button>Commit Project to a Database</base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: Array,
  },
  methods: {
    capitalizeFirstWord(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  computed: {
    noSections() {
      return this.sections.length === 0;
    },
  },
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
