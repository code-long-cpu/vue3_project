import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'

import pinia from '@/stores/index'

// const pinia = createPinia() //浏览器中显示pinia图标

const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')
