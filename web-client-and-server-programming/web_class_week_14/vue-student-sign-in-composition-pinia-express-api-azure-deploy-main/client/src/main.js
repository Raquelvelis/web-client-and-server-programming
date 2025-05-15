// Import Vue and Pinia core functions
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import styles and main App component
import './style.css'
import App from './App.vue'

// Create Pinia store instance
const pinia = createPinia()
// Create Vue application instance
const app = createApp(App)

// Add Pinia to the Vue application
app.use(pinia)

// Import Bootstrap styles and functionality
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

// Mount the Vue application to the DOM
app.mount('#app')
