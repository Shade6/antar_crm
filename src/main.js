import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueToast, {
    position: 'top',
    duration: 3000,
    dismissible: true
  });

app.use(createPinia())
app.use(router)

app.mount('#app')
