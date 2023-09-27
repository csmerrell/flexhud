import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // make sure you have installed Pinia

// Initialize Pinia store
const pinia = createPinia()

// Create the app instance
const app = createApp(App)

// Use the router and store
app.use(pinia)

// Mount the app
app.mount('#app')
