const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  id,
  name,
  options,
  ...rest
}) => {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')
  const baseClasses = [
    'w-full h-11 rounded-lg border px-3 text-body text-text placeholder:text-text-secondary',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40',
    disabled ? 'bg-slate-50 text-text-secondary cursor-not-allowed' : 'bg-white',
    error ? 'border-danger focus:ring-danger/30' : 'border-slate-300 focus:border-secondary',
  ].join(' ')
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-label text-text-secondary font-medium">
          {label}
        </label>
      )}
      {type === 'select' ? (
        <select id={inputId} name={name} value={value} onChange={onChange} disabled={disabled} className={baseClasses} {...rest}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseClasses}
          {...rest}
        />
      )}
      {error && <p className="text-small text-danger">{error}</p>}
    </div>
  )
}
export default Input
