import { createApp } from "vue";
import 'reflect-metadata'
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createStore } from './store'
import DIPlugin from './plugins/dependencyInjection'

const store = createStore()

createApp(App)
  .use(router)
  .use(store)
  .use(DIPlugin)
  .mount("#app");
