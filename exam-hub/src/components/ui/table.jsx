import Skeleton from './skeleton.jsx'
const Table = ({ columns, data, actions, isLoading = false, skeletonRows = 3, emptyMessage = 'Aucune donnée.' }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-bg">
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3 text-label uppercase tracking-wide text-text-secondary" style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
            {actions && <th className="px-5 py-3 text-label uppercase tracking-wide text-text-secondary text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`sk-${i}`} className={i % 2 === 1 ? 'bg-bg/40' : ''}>
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4">
                    <Skeleton height={14} width={col.skeletonWidth ?? '70%'} />
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-4 text-right">
                    <Skeleton height={28} width={80} className="ml-auto" />
                  </td>
                )}
              </tr>
            ))}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-10 text-center text-text-secondary text-small">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!isLoading &&
            data.map((row, i) => (
              <tr key={row.id} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-bg/40' : ''} hover:bg-blue-50/40`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 text-body align-middle">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-5 py-4 text-right align-middle">{actions(row)}</td>}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table
