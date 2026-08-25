import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/MockAuthContext.jsx'
const NAV_ITEMS = [
  { to: '/admin', label: 'Tableau de bord', end: true, icon: '▦' },
  { to: '/admin/students', label: 'Étudiants', icon: '◍' },
  { to: '/admin/courses', label: 'Cours', icon: '▤' },
  { to: '/admin/exams', label: 'Examens', icon: '✓' },
]
const LayoutAdmin = () => {
  const { user, logout } = useAuth()
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col bg-primary text-white">
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary font-bold">
            EH
          </span>
          <div>
            <p className="text-body font-extrabold leading-tight">Exam Hub</p>
            <p className="text-xs text-slate-400">Espace administrateur</p>
          </div>
        </div>
        <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-small font-medium transition-colors',
                  isActive ? 'bg-secondary/20 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-small font-semibold">{user?.name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
      </aside>
      <div className="ml-60 flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-4 border-b border-slate-200 bg-white px-8">
          <div className="text-right">
            <p className="text-small font-semibold leading-tight">{user?.name}</p>
            <p className="text-xs text-text-secondary">Administrateur</p>
          </div>
          <button
            onClick={logout}
            className="rounded-full bg-red-50 px-4 py-1.5 text-small font-semibold text-danger hover:bg-red-100"
          >
            Déconnexion
          </button>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default LayoutAdmin
