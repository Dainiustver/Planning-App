<template>
  <div class="auth__layout">
    <auth-form
      v-if="authTriggered"
      :authType="selectedAuthType"
      @close-auth-modal="authTriggered = false"
    ></auth-form>
    <div class="auth__actions">
      <base-button class="auth__actions--button" @click="openLoginModal"
        >Login</base-button
      >
      <base-button class="auth__actions--button" @click="openSignupModal"
        >Sign up</base-button
      >
    </div>
  </div>
</template>

<script>
import AuthForm from "./AuthForm.vue";
import BaseButton from "../ui/BaseButton.vue";
export default {
  data() {
    return {
      selectedAuthType: "",
      authTriggered: false,
    };
  },
  methods: {
    openLoginModal() {
      this.authTriggered = true;
      this.selectedAuthType = "login";
    },
    openSignupModal() {
      this.authTriggered = true;
      this.selectedAuthType = "signup";
    },
  },
  components: { BaseButton, AuthForm },
};
</script>

<style scoped>
@media (min-width: 360px) {
  .auth__actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .auth__actions--button {
    font-size: 0.7rem;
    margin: 0.2rem 0rem;
  }
}

@media (min-width: 700px) {
  .auth__actions {
    flex-direction: row;
  }

  .auth__actions--button {
    font-size: 0.8rem;
    margin: 0rem 0.2rem;
  }
}

@media (min-width: 1200px) {
  .auth__actions--button {
    font-size: 1rem;
  }
}

@media (min-width: 1500px) {
  .auth__actions--button {
    font-size: 1.2rem;
  }
}
</style>
