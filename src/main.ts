import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/vue-i18n'

import './assets/style.css'
import './assets/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
