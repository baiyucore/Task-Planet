import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin,QueryClient  } from "@tanstack/vue-query";
import pinia from "./store";
import piniaPersistedState from "pinia-plugin-persistedstate";
const queryClient = new QueryClient();

const app = createApp(App).use(router).use(pinia);
pinia.use(piniaPersistedState)
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");


