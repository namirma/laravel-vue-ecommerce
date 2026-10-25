import { createApp } from "vue";
import "./index.css";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
