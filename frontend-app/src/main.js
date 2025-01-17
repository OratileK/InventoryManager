/* Entry point for app */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import router from './router/index'
import './index.css'

const app = createApp(App)
app.use(createPinia())

app.use(router)

app.mount('#app')
