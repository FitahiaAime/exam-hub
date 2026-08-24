const Skeleton = ({ width = '100%', height = 16, className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
export default Skeleton
