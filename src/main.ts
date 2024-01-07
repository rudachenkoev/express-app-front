import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/vue-i18n'
import { createPinia } from 'pinia'
import { setAxiosConfigurations } from '@/configs/axios'
import { setIzitoastConfiguration } from '@/configs/izitoast'

import AppButton from '@components/app/AppButton.vue'
import AppInput from '@components/app/AppInput.vue'
import AppCheckbox from '@components/app/AppCheckbox.vue'

import './assets/style.css'
import './assets/tailwind.css'

const pinia = createPinia()
const app = createApp(App)

app.component('AppButton', AppButton)
app.component('AppInput', AppInput)
app.component('AppCheckbox', AppCheckbox)

app.use(router)
app.use(i18n)
app.use(pinia)

setAxiosConfigurations()
setIzitoastConfiguration()

app.mount('#app')
