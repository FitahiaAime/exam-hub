import { createContext, useContext, useState, useCallback } from 'react'
const MockAuthContext = createContext(null)
const DEMO_USERS = {
  admin: { id: 'u1', name: 'Admin Exam Hub', email: 'admin@examhub.fr', role: 'admin' },
  student: { id: 'u2', name: 'Alison Kouadio', email: 'alison.kouadio@mail.com', role: 'student' },
}
export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem('exam-hub-mock-role')
    return savedRole ? DEMO_USERS[savedRole] : null
  })
  const [loginError, setLoginError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const login = useCallback((email, password) => {
    setIsLoggingIn(true)
    setLoginError(null)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoggingIn(false)
        if (email === 'desactive@examhub.fr') {
          const message = 'Ce compte a été désactivé. Contactez un administrateur.'
          setLoginError(message)
          reject(new Error(message))
          return
        }
        if (!email || !password) {
          const message = 'Identifiants invalides'
          setLoginError(message)
          reject(new Error(message))
          return
        }
        const role = email.includes('admin') ? 'admin' : 'student'
        const demoUser = DEMO_USERS[role]
        localStorage.setItem('exam-hub-mock-role', role)
        setUser(demoUser)
        resolve(demoUser)
      }, 900)
    })
  }, [])
  const logout = useCallback(() => {
    localStorage.removeItem('exam-hub-mock-role')
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
  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>
}
export const useAuth = () => {
  const ctx = useContext(MockAuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de <MockAuthProvider>')
  return ctx
}
