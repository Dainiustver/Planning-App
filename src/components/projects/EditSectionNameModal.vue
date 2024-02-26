<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">How would you like to call this section?</div>
      <input
        type="text"
        :class="{ invalid: !formIsValid, 'modal-input': true }"
        @keyup.enter="saveChanges"
        @keyup.esc="closeModal"
        @focus="formIsValid = true"
        v-model.trim="editedSectionName"
        ref="sectionNameInput"
        placeholder="Enter new section name"
      />
      <p v-if="!formIsValid" class="invalid">
        Section name must not be empty or identical to an existing section name!
      </p>
      <div class="modal-footer">
        <base-button @click="saveChanges">Save</base-button>
        <base-button @click="closeModal">Cancel</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedSectionName: "",
      formIsValid: true,
    };
  },
  methods: {
    saveChanges() {
      this.formIsValid = true;
      if (this.editedSectionName == "" || this.notUniqueSection) {
        this.editedSectionName = "";
        this.formIsValid = false;
        this.$refs.sectionNameInput.blur();
        return;
      }
      this.$emit("update-section", this.editedSectionName);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },

  computed: {
    notUniqueSection() {
      let lowercaseInputName = this.editedSectionName.toLowerCase();
      return this.currentProject.sections.some(
        (section) => section.sectionName.toLowerCase() === lowercaseInputName
      );
    },
  },
  mounted() {
    this.$refs.sectionNameInput.focus();
  },
  props: ["currentProject"],
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #dccece;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}

.modal-header {
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-footer {
  text-align: right;
}

.invalid {
  color: red;
  border-color: red;
}

p {
  padding-bottom: 0.5rem;
}
</style>
