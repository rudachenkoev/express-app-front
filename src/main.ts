import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/vue-i18n'
import { setAxiosConfigurations } from '@/configs/axios'

import AppButton from '@components/app/AppButton.vue'
import AppInput from '@components/app/AppInput.vue'

import './assets/style.css'
import './assets/tailwind.css'

const app = createApp(App)

app.component('AppButton', AppButton)
app.component('AppInput', AppInput)

app.use(router)
app.use(i18n)

setAxiosConfigurations()

app.mount('#app')
