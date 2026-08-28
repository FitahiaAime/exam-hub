import Spinner from './spinner.jsx'
const VARIANTS = {
  primary: 'bg-secondary text-white hover:bg-blue-600 focus-visible:ring-secondary',
  secondary: 'bg-white text-text border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300',
  danger: 'bg-danger text-white hover:bg-red-600 focus-visible:ring-danger',
}
const SIZES = {
  sm: 'h-8 px-3 text-small',
  md: 'h-10 px-4 text-body',
  lg: 'h-12 px-6 text-body',
}
const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  const isDisabled = disabled || isLoading
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
        'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        VARIANTS[variant],
        SIZES[size],
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading && (
        <Spinner size={size === 'sm' ? 14 : 16} color={variant === 'secondary' ? '#1e293b' : '#ffffff'} />
      )}
      {children}
    </button>
  )
}
export default Button
