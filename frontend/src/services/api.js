import axios from 'axios'

export const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getImageUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`
  return path
}

export default api
