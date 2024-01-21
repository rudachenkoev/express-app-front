const DEV_MODE = import.meta.env.VITE_DEV_MODE

const deleteAllCookies = (cookieName: string) => {
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

type SetCookies = { cookieName: string, cookieValue: string, expirationMinutes?: number }
const setCookie = ({ cookieName, cookieValue, expirationMinutes = 720 }: SetCookies) => {
  let expires = new Date()
  expires.setTime(expires.getTime() + (expirationMinutes * 60 * 1000))
  document.cookie = `${cookieName}=${cookieValue};expires=${expires.toUTCString()};path=/`
}

export const setAuthToken = ({ key = 'Bearer', jwt }: { key?: string, jwt: string }) => {
  if (DEV_MODE === 'true') return localStorage.setItem('TOKEN', `${key} ${jwt}`)
  deleteAllCookies('TOKEN')
  setCookie({ cookieName: 'TOKEN', cookieValue: `${key} ${jwt}` })
}

export const checkAuthentication = (): boolean => {
  if (DEV_MODE === 'true') return !!localStorage.getItem('TOKEN')
  return !!document.cookie.match(new RegExp(`(^| )TOKEN=([^;]+)`))
}

export const logout = () => {
  deleteAllCookies('TOKEN')
  localStorage.removeItem('TOKEN')
}

export const generatePassword = ({ length, useUppercase = true, useNumbers = true }: { length: number, useUppercase?: boolean, useNumbers?: boolean }): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'

  let validChars = lowercaseChars
  if (useUppercase) validChars += uppercaseChars
  if (useNumbers) validChars += numberChars

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length)
    password += validChars.charAt(randomIndex)
  }
  return password
}
