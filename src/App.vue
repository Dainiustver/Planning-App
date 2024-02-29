<template>
  <the-header></the-header>
  <the-background></the-background>
  <the-content></the-content>
</template>

<script>
import axios from "axios";
import "./assets/style.css";
import TheHeader from "./components/layout/TheHeader.vue";
import TheBackground from "./components/layout/TheBackground.vue";
import TheContent from "./components/layout/TheContent.vue";

export default {
  async beforeCreate() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("login");
    }

    if (localStorage.getItem("projects") !== null) {
      JSON.parse(localStorage.getItem("projects")).forEach((project) => {
        this.$store.dispatch("createProject", project);
      });
    }

    if (this.$store.getters.isLoggedIn) {
      try {
        this.$store.dispatch("loadingProjects", true);

        const res = await axios.get("/api/project/list", {
          headers: { "Auth-Token": localStorage.getItem("token") },
        });
        const projects = res.data;

        if (projects.length > 0) {
          projects.forEach((project) => {
            const projectsAdjusted = {
              id: JSON.parse(project.description).id,
              name: project.title,
              sections: JSON.parse(project.description).sections,
            };

            this.$store.dispatch("createProject", projectsAdjusted);
          });

          this.$store.dispatch("loadingProjects", false);
        }
      } catch (e) {
        console.log(e);
        this.$store.dispatch("loadingProjects", false);
      }
    }
  },

  components: { TheHeader, TheBackground, TheContent },
};
</script>
