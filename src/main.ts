import { createNotivue } from 'notivue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './style.css'

import 'notivue/notification.css'
import 'notivue/animations.css'

const notivue = createNotivue({ position: 'top-right' })
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(notivue)

app.mount('#app')
