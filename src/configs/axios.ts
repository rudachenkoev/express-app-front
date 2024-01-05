import axios from 'axios'

const { VITE_API_URL, VITE_DEV_MODE } = import.meta.env

export const setAxiosConfigurations = () => {
  axios.defaults.baseURL = VITE_API_URL
  const token = localStorage.getItem('TOKEN')
  if (VITE_DEV_MODE === 'true' && token) axios.defaults.headers.common['Authorization'] = token


  axios.interceptors.response.use((response) => response, (error) => {
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error)
    }
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
        case 404:
          console.log(error.response.data)
          break;
        case 401:
          console.log(error.response.data)
          // TODO: call logout function and redirect to login page
          break;
        case 403:
          console.log(error.response.data)
          // TODO: $router.go(-1)
          break;
        case 500:
          console.log(error.response.data)
          break
      }
    }
    return Promise.reject(error)
  })
}
