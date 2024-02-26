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
    Project name must not be empty and up to 30 characters long!
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
  width: 50%;
  padding: 0.75rem; 
  border: 1px solid #ccc;
  border-radius: 4px; 
  text-align: center;
  font-size: 1rem;
}

h2 {
  font-size: 2rem;
  padding: 0 1rem;
}

.error {
  color: red;
  padding-bottom: 1rem;
}
.material-icons {
  cursor: pointer;
}
</style>
