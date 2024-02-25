<template>
  <section>
    <project-header :id="InitOrLoad"></project-header>
    <project-content :id="InitOrLoad"></project-content>

    <button style="height: 40px; padding: 10px" @click="send()">SEND</button>
  </section>
</template>

<script>
import axios from "axios";
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
  methods: {
    async send() {
      if (this.id) {
        // ProjectContent.vue
        await axios.put(
          "https://planning-app-c6aef-default-rtdb.europe-west1.firebasedatabase.app/projects/" +
            this.project.firebaseId +
            ".json",
          { ...this.project }
        );

        return;
      }

      // Probably here?
      await axios.post(
        "https://planning-app-c6aef-default-rtdb.europe-west1.firebasedatabase.app/projects.json",
        { ...this.newProject }
      );
    },
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
