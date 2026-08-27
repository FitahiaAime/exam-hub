import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { fetchWithAuth, getToken, setToken, removeToken } from '../services/fetchWithAuth.js'
import { decodeToken } from '../utils/decodeToken.js'

const AuthContext = createContext(null)
const USER_CACHE_KEY = 'exam-hub-user'

const readCachedUser = () => {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = getToken()
    return token ? readCachedUser() : null
  })
  const [loginError, setLoginError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (token && !decodeToken(token)) {
      removeToken()
      localStorage.removeItem(USER_CACHE_KEY)
      setUser(null)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setIsLoggingIn(true)
    setLoginError(null)
    try {
      const data = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const payload = decodeToken(data.token)
      const nextUser = { id: payload?.userId ?? null, name: email, email, role: data.role }
      setToken(data.token)
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(nextUser))
      setUser(nextUser)
      setIsLoggingIn(false)
      return nextUser
    } catch (err) {
      setIsLoggingIn(false)
      setLoginError(err.message)
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    removeToken()
    localStorage.removeItem(USER_CACHE_KEY)
    setUser(null)
  }, [])

  const value = {
    user,
    role: user?.role ?? null,
    isAuthenticated: Boolean(user),
    isLoggingIn,
    loginError,
    login,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de <MockAuthProvider>')
  return ctx
}
