import axios from 'axios'
import iziToast from 'izitoast'
import i18n from '@/plugins/vue-i18n'
import { logout } from '@helpers/auth'
import router from '@/router'

const { VITE_API_URL, VITE_DEV_MODE } = import.meta.env

export const setAxiosConfigurations = () => {
  axios.defaults.baseURL = VITE_API_URL
  const token = localStorage.getItem('TOKEN')
  if (VITE_DEV_MODE === 'true' && token) axios.defaults.headers.common['Authorization'] = token
  axios.defaults.headers.common['Accept-Language'] = i18n.global.locale.value


  axios.interceptors.response.use((response) => response, (error) => {
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error)
    }
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
        case 404:
          iziToast.error({ message: i18n.global.t(`notify.errors.${error.response.data}`) })
          break
        case 401:
          logout()
          location.href = '/login'
          break
        case 403:
          iziToast.error({ message: i18n.global.t('notify.errors.Forbidden access') })
          router.go(-1)
          break
        case 500:
          iziToast.error({
            title: i18n.global.t('errorOccurred'),
            message: i18n.global.t('notify.errors.Server error')
          })
          break
      }
    }
    return Promise.reject(error)
  })
}
