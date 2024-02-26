<template>
  <header>
    <h2>Your previous projects</h2>
  </header>
  <div v-if="noProjects" class="no-projects">
    <h3>Currently you have no projects.</h3>
  </div>
  <div v-else class="project-layout">
    <div class="each-project" v-for="project in projects" :key="project.id">
      <base-button @click="navigate(project.id)">
        {{ project.name }}
      </base-button>
      <button
        class="delete-icon"
        @click.stop="openDeleteModal(project.id, project.name)"
      >
        ❌
      </button>
    </div>
    <delete-project
      v-if="deleteModalOpen"
      @close-modal="deleteModalOpen = false"
      :id="projectToDeleteID"
      :projectName="projectToDeleteName"
    ></delete-project>
  </div>
</template>

<script>
import DeleteProject from "../projects/DeleteProjectModal.vue";
export default {
  data() {
    return {
      projectToDeleteID: null,
      projectToDeleteName: null,
      deleteModalOpen: false,
    };
  },
  computed: {
    projects() {
      return this.$store.getters.projects;
    },
    noProjects() {
      return this.projects.length === 0;
    },
  },
  methods: {
    navigate(id) {
      this.$router.push({ name: "EditProject", params: { id } });
    },
    openDeleteModal(id, name) {
      this.projectToDeleteID = id;
      this.projectToDeleteName = name;
      this.deleteModalOpen = true;
    },
  },
  components: { DeleteProject },
};
</script>

<style scoped>
header {
  padding: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;
}

@media (max-width: 600px) {
  header {
    font-size: 20px;
    padding: 15px;
  }
}

.project-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.each-project {
  display: flex;
  align-items: center;
  margin: 1.5rem;
  position: relative;
  transform: scale(1.2); 
  transition: transform 0.3s ease;
}

.each-project:hover {
  transform: scale(1.4); 
}


.delete-icon {
  padding: 0.5rem;
  margin-left: 15px; 
  border: none;
  background: none;
  color: #ff0000;
  cursor: pointer;
  font-size: 1.25rem;
  transition: color 0.2s ease;
}

.delete-icon:hover {
  color: #d11a2a;
}

.no-projects {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}
</style>
