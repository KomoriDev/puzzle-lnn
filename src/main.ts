import { createNotivue } from 'notivue'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './style.css'

import 'notivue/notification.css'
import 'notivue/animations.css'

const notivue = createNotivue({ position: 'top-right' })
const app = createApp(App)

app.use(router)
app.use(notivue)

app.mount('#app')
