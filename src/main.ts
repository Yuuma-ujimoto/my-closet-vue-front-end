import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { key, store } from "./plugins/store";

createApp(App)
    .use(store,key)
    .use(router)
    .mount('#app')
