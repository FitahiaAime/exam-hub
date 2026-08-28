const VARIANTS = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-red-100 text-red-700',
  locked: 'bg-amber-100 text-amber-700',
  draft: 'bg-slate-200 text-text-secondary',
  info: 'bg-blue-100 text-secondary',
}
const Badge = ({ variant = 'active', children }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANTS[variant] ?? VARIANTS.active}`}
    >
      {children}
    </span>
  )
}
export default Badge
