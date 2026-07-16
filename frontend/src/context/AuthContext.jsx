import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api, { getImageUrl } from '../services/api'

const AuthContext = createContext(null)

const normalizeUser = (userData) => ({
  ...userData,
  profilePhoto: userData?.profilePhoto ? getImageUrl(userData.profilePhoto) : ''
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (storedUser && token) {
      setUser(normalizeUser(JSON.parse(storedUser)))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const normalizedUser = normalizeUser(response.data.user)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(normalizedUser))
    setUser(normalizedUser)
    return response.data
  }

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  }

  const updateProfile = async (payload) => {
    const response = await api.patch('/auth/profile', payload)
    const updatedUser = normalizeUser(response.data.user)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    return response.data
  }

  const updateUser = (updatedUser) => {
    const normalizedUser = normalizeUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(normalizedUser))
    setUser(normalizedUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, register, updateProfile, updateUser, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
