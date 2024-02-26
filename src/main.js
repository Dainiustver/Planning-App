import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/store.js";
import router from "./router.js";

import BaseButton from "./components/ui/BaseButton.vue";

const app = createApp(App);

app.component("base-button", BaseButton);

app.use(router);
app.use(store);
app.mount("#app");
