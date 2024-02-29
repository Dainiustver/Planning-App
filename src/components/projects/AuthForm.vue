<template>
  <div class="auth__layout">
    <div
      v-if="
        (authSuccess === null || authSuccess === false) &&
        authMode !== 'login' &&
        !isAuthenticating
      "
    >
      <div class="auth__header">
        <h3>{{ authMode.toUpperCase() }}</h3>
      </div>
      <form class="auth__details">
        <label for="email">E-mail</label>
        <input type="text" name="email" v-model="email" />
        <label for="password">Password</label>
        <input type="text" name="password" v-model="password" />
      </form>
      <p v-if="authCaption !== ''" class="auth--caption">
        {{ authCaption }}
      </p>
      <div class="auth__actions">
        <base-button class="primary__action" @click="confirmAuth"
          >Confirm</base-button
        >
        <base-button class="secondary__action" @click="cancelAuth"
          >Cancel</base-button
        >
      </div>
    </div>

    <div v-if="authSuccess && authMode !== 'login' && !isAuthenticating">
      <div class="auth__header">
        <h3>{{ authMode.toUpperCase() }}</h3>
      </div>
      <p class="auth--caption">
        {{ authCaption }}
      </p>
      <div class="auth__actions">
        <base-button @click="switchToLogin">Login</base-button>
        <base-button @click="$emit('close-auth-modal')">Cancel</base-button>
      </div>
    </div>

    <div v-if="authMode === 'login' && !isAuthenticating">
      <div class="auth__header">
        <h3>{{ authMode.toUpperCase() }}</h3>
      </div>
      <form class="auth__details">
        <label for="email">E-mail</label>
        <input type="text" name="email" v-model="email" />
        <label for="password">Password</label>
        <input type="text" name="password" v-model="password" />
      </form>
      <p v-if="authCaption !== ''" class="auth--caption">
        {{ authCaption }}
      </p>
      <div class="auth__actions">
        <base-button class="primary__action" @click="confirmAuth"
          >Confirm</base-button
        >
        <base-button class="secondary__action" @click="cancelAuth"
          >Cancel</base-button
        >
      </div>
    </div>

    <div v-if="loginSuccess && !isAuthenticating">
      <div class="auth__header">
        <h3>{{ authMode.toUpperCase() }}</h3>
      </div>
      <p class="auth--caption">
        {{ authCaption }}
      </p>
      <div class="auth__actions">
        <base-button @click="$emit('close-auth-modal')">Zjbs seni</base-button>
      </div>
    </div>

    <div v-if="isAuthenticating">
      <base-spinner></base-spinner>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseSpinner from "../ui/BaseSpinner.vue";
import BaseButton from "../ui/BaseButton.vue";

export default {
  data() {
    return {
      authMode: this.authType,
      email: "",
      password: "",
      isAuthenticating: false,
      authSuccess: null,
      loginSuccess: null,
      authCaption: "",
    };
  },
  methods: {
    confirmAuth() {
      // this.$emit("close-auth-modal");
      this.authMode === "signup" ? this.signup() : this.login();
    },
    async signup() {
      this.isAuthenticating = true;
      this.authSuccess = null;
      try {
        const signupRes = await axios.post("/api/site/register", {
          email: this.email,
          password: this.password,
        });
        this.isAuthenticating = false;
        this.authSuccess = true;
        this.authCaption =
          this.capitalizeFirstWord(this.authMode) + " succesful!";
        this.email = "";
        this.password = "";
        console.log(signupRes);
      } catch (err) {
        this.isAuthenticating = false;
        this.authSuccess = false;
        this.email = "";
        this.password = "";
        this.authCaption =
          this.capitalizeFirstWord(this.authMode) +
          " failed! Error message: " +
          err.message +
          ". Try again or contact the administrator if you believe this is a mistake.";
      }
    },

    async login() {
      this.isAuthenticating = true;
      this.loginSuccess = null;
      try {
        const loginRes = await axios.post("/api/site/login/", {
          email: this.email,
          password: this.password,
        });
        this.isAuthenticating = false;
        this.loginSuccess = true;
        this.authCaption = "Login Success";
        this.$store.dispatch("login");
        localStorage.setItem("token", loginRes.data["token"]);
      } catch (err) {
        this.isAuthenticating = false;
        this.loginSuccess = false;
        this.authCaption =
          this.capitalizeFirstWord(this.authMode) +
          " failed! Error message: " +
          err.message +
          ". Try again or contact the administrator if you believe this is a mistake.";
      }
    },
    switchToLogin() {
      this.authMode = "login";
      this.isAuthenticating = false;
      this.authSuccess = true;
      this.authCaption = "";
    },
    cancelAuth() {
      this.$emit("close-auth-modal");
    },
    capitalizeFirstWord(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  props: ["authType"],
  components: { BaseButton, BaseSpinner },
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
.auth__actions,
.auth--caption {
  color: black;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  width: 25rem;

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
