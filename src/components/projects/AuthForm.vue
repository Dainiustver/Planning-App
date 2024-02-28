<template>
  <div class="auth__layout">
    <div class="auth__header">
      <h3>{{ authType.toUpperCase() }}</h3>
    </div>
    <form class="auth__details">
      <label for="username">Username</label>
      <input type="text" name="username" />
      <label for="password">Password</label>
      <input type="text" name="password" />
    </form>
    <div class="auth__actions">
      <base-button class="primary__action" @click="confirmAuth"
        >Confirm</base-button
      >
      <base-button class="secondary__action" @click="cancelAuth"
        >Cancel</base-button
      >
    </div>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  methods: {
    confirmAuth() {
      this.$emit("close-auth-modal");
      //login
    },
    cancelAuth() {
      this.$emit("close-auth-modal");
    },
  },
  props: ["authType"],
  components: { BaseButton },
};
</script>

<style scoped>
.auth__layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.auth__header,
.auth__details,
.auth__actions {
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 30rem;
  text-align: center;
}

.auth__details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth__header {
  color: black;
  padding-top: 1.5rem;
}

.auth__details {
  color: black;
  padding: 1.5rem;
}

.auth__details input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #624c4c;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
}

.auth__actions {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 2rem;
}

.primary__action,
.secondary__action {
  padding: 0.5rem 1.5rem;
}
</style>
