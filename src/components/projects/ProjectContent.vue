<template>
  <nav>
    <base-button
      v-for="section in currentProject.sections"
      :key="section.sectionName"
      @click="select(section.sectionName)"
      :class="{
        selected: section.sectionName === selectedSectionName,
        sections: true,
      }"
      >{{ capitalizeFirstWord(section.sectionName) }}</base-button
    >
    <delete-section
      v-if="deleteModalIsOpen"
      @delete-section="deleteSection"
      @close-modal="closeDeleteModal"
    ></delete-section>
    <edit-name
      v-if="editModalIsOpen"
      :currentProject="currentProject"
      @update-section="editSectionName"
      @close-modal="closeEditModal"
    ></edit-name>
    <overview-component
      v-if="selectedSectionName === 'Overview'"
      :sections="currentProjectOverviewSections"
    ></overview-component>
    <div v-else>
      <div class="sectionData" v-if="!isEditing">
        <p style="width: 100%">{{ currentSectionData }}</p>
        <span class="material-icons" @click="editSectionContent">edit</span>
      </div>
      <div v-else>
        <textarea
          v-model.trim="updatedSectionData"
          :class="{ inputInvalid: !dataIsValid, sectionDataEdit: true }"
          @focus="removeInvalid"
          ref="sectionData"
          rows="9"
          cols="50"
        />
        <div class="buttons">
          <base-button @click="confirmSectionContent"
            >Confirm Changes ✅</base-button
          >
          <base-button @click="editModalIsOpen = true"
            >Edit Section Name ✏️</base-button
          >
          <base-button @click="deleteModalIsOpen = true"
            >Delete Section ❌</base-button
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import EditName from "./EditSectionNameModal.vue";
import DeleteSection from "./DeleteSectionModal.vue";
import OverviewComponent from "./OverviewComponent.vue";
export default {
  data() {
    return {
      dataIsValid: true,
      isEditing: false,
      selectedSectionName: "Overview",
      updatedSectionData: "",
      editModalIsOpen: false,
      deleteModalIsOpen: false,
    };
  },
  methods: {
    select(sectionName) {
      this.isEditing = false;
      this.selectedSectionName =
        sectionName === this.selectedSectionName ? "Overview" : sectionName;
      if (sectionName === "Add Section...") {
        this.$store.dispatch("addSection", {
          id: this.id,
          sectionName: "New Section",
          sectionData: "This is a new section",
        });
        const lastSection = this.currentProject.sections.length - 2;
        this.selectedSectionName =
          this.currentProject.sections[lastSection].sectionName;
      }
    },
    deleteSection() {
      this.isEditing = false;
      this.$store.dispatch("deleteSection", {
        id: this.id,
        deletedSection: this.selectedSectionName,
      });
      this.selectedSectionName = "Overview";
      this.closeDeleteModal();
    },
    editSectionName(newName) {
      this.$store.dispatch("editProjectSectionName", {
        id: this.id,
        editedSectionName: this.selectedSectionName,
        updatedSectionName: newName,
      });
      this.selectedSectionName = newName;
    },
    editSectionContent() {
      this.isEditing = true;
      this.updatedSectionData = this.currentSectionData;
      this.$nextTick(() => {
        this.$refs.sectionData.focus();
      });
    },

    confirmSectionContent() {
      this.dataIsValid = true;
      if (this.updatedSectionData === "") {
        this.updatedSectionData = "Section must not be empty!";
        this.dataIsValid = false;
        return;
      }
      this.isEditing = false;
      this.$store.dispatch("editProjectSectionData", {
        id: this.id,
        editedSectionName: this.selectedSectionName,
        updatedContent: this.updatedSectionData,
      });
    },
    removeInvalid() {
      if (!this.dataIsValid) {
        this.dataIsValid = true;
        this.updatedSectionData = "";
      }
    },
    closeEditModal() {
      this.editModalIsOpen = false;
    },
    closeDeleteModal() {
      this.deleteModalIsOpen = false;
    },
    capitalizeFirstWord(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  computed: {
    currentProject() {
      return this.$store.getters.projects.find(
        (project) => project.id === this.id
      );
    },
    currentSectionData() {
      const currentSection = this.currentProject.sections.find(
        (section) => section.sectionName === this.selectedSectionName
      );
      return this.capitalizeFirstWord(currentSection.sectionData);
    },
    currentProjectOverviewSections() {
      return this.currentProject.sections.filter(
        (section) =>
          section.sectionName !== "Overview" &&
          section.sectionName !== "Add Section..."
      );
    },
  },
  components: { EditName, DeleteSection, OverviewComponent },
  props: ["id"],
};
</script>

<style scoped>
.selected {
  background-color: #4caf50;
  border: 2px solid #388e3c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.selected:hover {
  background-color: #43a047;
  border-color: #2e7d32;
  transform: translateY(-2px);
}

.sectionData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #f0f0f0;
  color: #333;
  margin: 2rem auto;
  padding: 1rem;
  padding-bottom: 50px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  min-height: 40vh;
  word-break: break-all;
}

.sectionData p {
  margin: 0;
  line-height: 1.6;
  font-size: 1.5rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-height: 40vh;
  overflow-y: auto;
}

.sectionDataEdit {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: block;
  width: 80%;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  color: #333;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.6;
  resize: vertical;
  min-height: 5rem;
}

.material-icons {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}

.inputInvalid,
.inputInvalid:focus {
  border-color: red;
  color: red;
}
</style>
