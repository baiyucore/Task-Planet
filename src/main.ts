import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin,QueryClient  } from "@tanstack/vue-query";
import pinia from "./store";

const queryClient = new QueryClient();

const app = createApp(App).use(router).use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");

