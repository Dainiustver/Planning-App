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

    <base-button v-if="isEditing" @click="confirmName">Confirm ✅</base-button>
  </header>
  <p class="error" v-if="!isValid">
    Project name must not be empty and be up to 30 characters long!
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
        this.updatedProjectName.length > 30
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
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

input {
  width: 50%; /* Full width */
  padding: 0.75rem; /* Comfortable padding */
  border: 1px solid #ccc; /* Subtle border */
  border-radius: 4px; /* Rounded corners */
  box-sizing: border-box; /* Includes padding and border in the element's total width and height */
  text-align: center;
  font-size: 1rem; /* Readable text size */
  line-height: 1.5; /* Adequate line height for readability */
}

h2 {
  font-size: 2rem;
  padding: 0 1rem;
}

.error {
  color: red;
  padding: 0.5rem;
}
.material-icons {
  cursor: pointer;
  margin-bottom: 0.75rem;
}
</style>
