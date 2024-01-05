const DEV_MODE = import.meta.env.VITE_DEV_MODE

function deleteAllCookies(cookieName: string) {
  let cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    let eqPos = cookie.indexOf('=')
    let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

    name = name.replace(/^\s+/g, '')

    if (name === cookieName) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
  }
}

function setCookie({ cookieName, cookieValue, expirationMinutes = 720 }: { cookieName: string, cookieValue: string, expirationMinutes?: number }) {
  let expires = new Date()
  expires.setTime(expires.getTime() + (expirationMinutes * 60 * 1000))
  document.cookie = `${cookieName}=${cookieValue};expires=${expires.toUTCString()};path=/`
}

export const setAuthToken = ({ key = 'Bearer', jwt }: { key?: string, jwt: string }) => {
  if (DEV_MODE === 'true') return localStorage.setItem('TOKEN', `${key} ${jwt}`)
  deleteAllCookies('TOKEN')
  setCookie({ cookieName: 'TOKEN', cookieValue: `${key} ${jwt}` })
}

export const logout = () => {
  deleteAllCookies('TOKEN')
  localStorage.removeItem('TOKEN')
}
