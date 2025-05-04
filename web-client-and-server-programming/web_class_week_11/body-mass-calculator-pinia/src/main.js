import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

// Create Vue app
const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()

// Use Pinia with the app
app.use(pinia)

// Mount the app
app.mount('#app')