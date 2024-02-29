<template>
  <header>
    <router-link to="/">
      <h1>Planning App</h1>
    </router-link>
    <div class="button__container">
      <router-link to="/new-project">
        <base-button class="button">New Project</base-button>
      </router-link>
      <router-link to="/browse-projects">
        <base-button class="button">Browse Projects</base-button>
      </router-link>
    </div>

    <auth-component v-if="!userLoggedIn"></auth-component>
    <div v-else>
      <base-button class="button" @click="logout">Log out</base-button>
    </div>
  </header>
</template>

<script>
import AuthComponent from "../projects/AuthComponent.vue";
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      localStorage.removeItem("token");
    },
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
  },
  components: { AuthComponent },
};
</script>

<style scoped>
header {
  background-image: linear-gradient(to right bottom, #773202, #a75936);
  color: white;
}

header h1 {
  color: #f5deb3;
}

@media (min-width: 360px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
  }
  header h1 {
    font-size: 1.2rem;
    text-align: center;
  }

  .button__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .button {
    font-size: 0.7rem;
    margin: 0.2rem 0rem;
  }
}

@media (min-width: 400px) {
  header {
    justify-content: space-around;
  }

  header h1 {
    font-size: 1.5rem;
  }
}

@media (min-width: 700px) {
  header h1 {
    font-size: 1.8rem;
  }
  .button__container {
    flex-direction: row;
  }
  .button {
    font-size: 0.8rem;
    margin: 0rem 0.2rem;
  }
}

@media (min-width: 1000px) {
  header h1 {
    font-size: 2rem;
  }
}

@media (min-width: 1200px) {
  header h1 {
    font-size: 2.2rem;
  }

  .button {
    font-size: 1rem;
  }
}

@media (min-width: 1500px) {
  header h1 {
    font-size: 2.5rem;
  }
  .button {
    font-size: 1.2rem;
  }
}
</style>
