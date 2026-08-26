import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/ui/toast.jsx'
const ToastContext = createContext(null)
let idCounter = 0
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])
  const showToast = useCallback((type, message) => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-96 max-w-[90vw]">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast doit être utilisé à l\'intérieur de <ToastProvider>')
  return ctx
}
