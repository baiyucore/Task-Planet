import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router";

import pinia from "./store";

let app = createApp(App).use(router).use(pinia);
app.mount("#app");

