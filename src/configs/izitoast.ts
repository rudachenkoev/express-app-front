import { default as iziToast, IziToastSettings } from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import i18n from '@/plugins/vue-i18n'

const config: IziToastSettings = {
  close: true,
  pauseOnHover: true,
  timeout: 3000,
  progressBar: false,
  layout: 2,
  position: 'topRight',
  backgroundColor: '#FFFFFF',
  titleSize: '12px',
  titleLineHeight: '24px',
  titleColor: '#101828',
  messageSize: '10px',
  messageLineHeight: '16px',
  messageColor: '#667085',
  title: i18n.global.t('payAttention')
}

export const setIzitoastConfiguration = () => iziToast.settings(config)
