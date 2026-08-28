import Button from './button.jsx'
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmVariant = 'primary',
  isConfirmLoading = false,
  hideFooter = false,
}) => {
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/45 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-h2">{title}</h2>
          <button
            aria-label="Fermer"
            onClick={onClose}
            className="rounded-full p-1 text-text-secondary hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {!hideFooter && (
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm} isLoading={isConfirmLoading}>
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Modal
