<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        Are you sure you want to delete this section?
      </div>
      <div class="modal-footer">
        <base-button class="button delete" @click="confirmDelete"
          >Delete</base-button
        >
        <base-button class="button" @click="closeModal">Cancel</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirmDelete() {
      this.$emit("delete-section");
      this.closeModal();
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
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
.modal-footer {
  text-align: right;
}

.delete {
  background-color: red;
}

.delete:hover {
  background-color: rgb(158, 14, 14);
}

@media (min-width: 360px) {
  .modal-header {
    margin-bottom: 1rem 0rem;
  }

  .button {
    font-size: 1rem;
  }
}
</style>
