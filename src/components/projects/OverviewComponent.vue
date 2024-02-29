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
        <span class="overview__section--data">{{ section.sectionData }}</span>
      </div>
      <p v-else>Currently there are no sections.</p>
      <base-button
        v-if="!noSections"
        @click="saveProjects"
        class="overview--save__changes"
        >Confirm changes (applies to all edits, including in other
        projects)</base-button
      >
      <base-spinner v-if="projectsSaved === false"></base-spinner>
      <p class="overview--save__projects" v-if="projectsSaved === true">
        Success!
      </p>
      <p class="error" v-if="errorCaption !== ''">
        {{ errorCaption }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseSpinner from "../ui/BaseSpinner.vue";
export default {
  data() {
    return {
      projectsSaved: null,
      errorCaption: "",
    };
  },
  props: ["sections"],
  methods: {
    async saveProjects() {
      if (!this.$store.getters.isLoggedIn) {
        localStorage.setItem("projects", JSON.stringify(this.projects));
        this.projectsSaved = true;
      }

      if (this.$store.getters.isLoggedIn) {
        try {
          this.projectsSaved = false;
          await axios.post(
            "/api/project/delete-all",
            {},
            {
              headers: { "Auth-Token": localStorage.getItem("token") },
            }
          );

          const vuexProjects = this.$store.getters.projects;

          for (const project of vuexProjects) {
            await axios.post(
              "/api/project/create",
              {
                title: project.name,
                description: JSON.stringify({
                  id: project.id,
                  sections: project.sections,
                }),
              },

              {
                headers: { "Auth-Token": localStorage.getItem("token") },
              }
            );
          }

          localStorage.removeItem("projects");
          this.projectsSaved = true;
          setTimeout(() => {
            this.projectsSaved = null;
          }, 5000);
        } catch (e) {
          this.errorCaption =
            "Something went wrong! Error message: " +
            e.message +
            ". Please try again later or contact the administrator if you think this is a mistake";
          this.projectsSaved = null;
        }
      }
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
  },
  components: { BaseSpinner },
};
</script>

<style scoped>
.overview-container {
  padding: 1.5rem;
  background-color: #f0f0f0;
  min-height: 50vh;
  margin: 1rem auto;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.section-overview {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.section-overview strong {
  margin-right: 0.5rem;
  color: #333;
}

.overview--save__projects {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 2rem;
}

@media (min-width: 360px) {
  strong,
  .overview__section--data {
    font-size: 1rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow-x: auto;
    max-width: 100%;
    hyphens: auto;
  }

  .overview--save__changes {
    font-size: 0.9rem;
  }
}

@media (min-width: 850px) {
  strong,
  .overview__section--data {
    font-size: 1.2rem;
  }

  .overview--save__changes {
    font-size: 1.1rem;
  }
}

@media (min-width: 1000px) {
  strong,
  .overview__section--data {
    font-size: 1.4rem;
  }

  .overview--save__changes {
    font-size: 1.2rem;
  }
}

@media (min-width: 1300px) {
  strong,
  .overview__section--data {
    font-size: 1.6rem;
  }
  .overview--save__changes {
    font-size: 1.4rem;
  }
}

@media (min-width: 1600px) {
  strong,
  .overview__section--data {
    font-size: 1.8rem;
  }
  .overview--save__changes {
    font-size: 1.6rem;
  }
}
</style>
