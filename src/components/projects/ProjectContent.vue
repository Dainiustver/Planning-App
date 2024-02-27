<template>
  <nav>
    <div class="sections">
      <base-button
        v-for="section in currentProject.sections"
        :key="section.sectionName"
        @click="select(section.sectionName)"
        :class="{
          selected: section.sectionName === selectedSectionName,
          sectionName: true,
        }"
        >{{ capitalizeFirstWord(section.sectionName) }}</base-button
      >
    </div>
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
        <p lang="en" class="section__data">{{ currentSectionData }}</p>
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
        <div class="button">
          <base-button @click="confirmSectionContent" class="button"
            >Confirm Changes ✅</base-button
          >
          <base-button @click="editModalIsOpen = true" class="button"
            >Edit Section Name ✏️</base-button
          >
          <base-button @click="deleteModalIsOpen = true" class="button"
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
  padding: 1rem 1rem 3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  min-height: 40vh;
}

.sectionDataEdit {
  /* display: block; */

  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  color: #333;
  text-align: center;

  resize: vertical;
}

.material-icons {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}

.inputInvalid {
  border-color: red;
  color: red;
}

@media (min-width: 360px) {
  .sectionDataEdit {
    width: 80%;
    margin: 2rem auto 1rem;
    padding: 1rem;
    height: 15rem;
    font-size: 1rem;
    line-height: 1.6;
  }
  .sections {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sectionName {
    margin: 0.3rem;
    font-size: 0.8rem;
  }

  .section__data {
    font-size: 1rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow-x: auto;
    max-width: 100%;
    hyphens: auto;
  }

  .button {
    margin: 0.2rem 0rem;
    font-size: 0.8rem;
  }

  .material-icons {
    font-size: 1rem;
  }
}
</style>
