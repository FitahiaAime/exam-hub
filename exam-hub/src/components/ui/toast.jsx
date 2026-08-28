import { useEffect } from 'react'
const STYLES = {
  success: { bg: 'bg-green-50', border: 'border-success', text: 'text-green-800', icon: '✓' },
  error: { bg: 'bg-red-50', border: 'border-danger', text: 'text-red-800', icon: '!' },
  info: { bg: 'bg-blue-50', border: 'border-secondary', text: 'text-blue-800', icon: 'i' },
}
const Toast = ({ type = 'info', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), 5000)
    return () => clearTimeout(timer)
  }, [onClose])
  const s = STYLES[type] ?? STYLES.info
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border ${s.border} ${s.bg} px-4 py-3 shadow-card animate-[fadeIn_0.15s_ease-out]`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-secondary'
        }`}
      >
        {s.icon}
      </span>
      <p className={`flex-1 text-small font-medium ${s.text}`}>{message}</p>
      <button onClick={onClose} className={`text-small ${s.text} opacity-60 hover:opacity-100`} aria-label="Fermer">
        ✕
      </button>
    </div>
  )
}
export default Toast
