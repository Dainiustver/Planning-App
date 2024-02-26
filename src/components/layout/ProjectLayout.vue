<template>
  <section>
    <project-header :id="InitOrLoad"></project-header>
    <project-content :id="InitOrLoad"></project-content>
  </section>
</template>

<script>
import ProjectHeader from "../projects/ProjectHeader.vue";
import ProjectContent from "../projects/ProjectContent.vue";

export default {
  props: ["id"],

  beforeMount() {
    if (!this.id) {
      this.$store.dispatch("createProject", this.newProject);
    }
  },

  data() {
    return {
      newProject: {
        id: Math.random().toString(36).slice(2, 11),
        name: "New Project",
        sections: [
          {
            sectionName: "Overview",
            sectionData: "Here you will see the overview of the project",
          },
          {
            sectionName: "Name of Event",
            sectionData: "This is the name of the event",
          },
          {
            sectionName: "Location of Event",
            sectionData: "This is the location of the event",
          },
          {
            sectionName: "Description",
            sectionData: "This is the description of the event",
          },
          {
            sectionName: "Add Section...",
            sectionData: "Here you can add your own custom section",
          },
        ],
      },
    };
  },

  computed: {
    InitOrLoad() {
      return this.id ? this.id : this.newProject.id;
    },
  },

  components: { ProjectHeader, ProjectContent },
};
</script>

<style scoped>
section {
  text-align: center;
}
</style>
