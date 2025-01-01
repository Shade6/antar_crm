import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // Import the plugin
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import App from './App.vue'
import router from './router'

// Create Pinia instance
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // Enable persistence plugin

// Create App instance
const app = createApp(App)

app.use(VueToast, {
    position: 'top',
    duration: 3000,
    dismissible: true
});

app.use(pinia) // Use Pinia with persistence enabled
app.use(router)

// Mount the app
app.mount('#app')
