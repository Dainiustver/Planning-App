<template>
  <header>
    <h2 v-if="!isEditing">{{ currentProjectName }}</h2>

    <input
      v-if="isEditing"
      type="text"
      v-model.trim="updatedProjectName"
      @keyup.enter="confirmName"
      @keyup.esc="isEditing = false"
      @focus="isValid = true"
      ref="nameInput"
      :style="{ borderColor }"
    />

    <span class="material-icons" v-if="!isEditing" @click="editName">edit</span>

    <base-button
      v-if="isEditing"
      @click="confirmName"
      class="project__header--edit"
      >Confirm ✅</base-button
    >
  </header>
  <p class="error" v-if="!isValid">
    Project name must not be empty and up to 15 characters long!
  </p>
</template>

<script>
export default {
  data() {
    return {
      updatedProjectName: "",
      isEditing: false,
      isValid: true,
    };
  },
  methods: {
    editName() {
      this.updatedProjectName = this.currentProjectName;
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.nameInput.focus();
      });
    },
    confirmName() {
      this.isValid = true;

      if (
        this.updatedProjectName === "" ||
        this.updatedProjectName.length > 15
      ) {
        this.isValid = false;
        return;
      }

      this.isEditing = false;
      this.$store.dispatch("editProjectName", {
        id: this.id,
        name: this.updatedProjectName,
      });
    },
  },
  computed: {
    currentProjectName() {
      const currentProject = this.$store.getters.projects.find(
        (project) => project.id === this.id
      );
      return currentProject.name;
    },
    borderColor() {
      return this.isValid ? "black" : "red";
    },
  },
  props: ["id"],
};
</script>

<style scoped>
@media (min-width: 360px) {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  input {
    border-radius: 4px;
    text-align: center;
    width: 15rem;
    height: 3rem;
  }

  .project__header--edit {
    font-size: 1rem;
    margin: 1rem 0rem;
  }

  .error {
    color: red;
    padding-bottom: 1rem;
  }

  .material-icons {
    cursor: pointer;
    font-size: 1rem;
    margin: 1rem 0rem;
  }
}
</style>
