import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/MockAuthContext.jsx'
const NAV_ITEMS = [
  { to: '/student', label: 'Accueil', end: true },
  { to: '/student/results', label: 'Historique', end: false },
]
const LayoutStudent = () => {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-bg">
      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary font-bold text-white">
              EH
            </span>
            <p className="text-body font-extrabold">Exam Hub</p>
          </div>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2 text-small font-medium transition-colors',
                    isActive ? 'bg-blue-50 text-secondary' : 'text-text-secondary hover:bg-slate-100',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-small font-semibold leading-tight">{user?.name}</p>
            <p className="text-xs text-text-secondary">Étudiant</p>
          </div>
          <button
            onClick={logout}
            className="rounded-full bg-red-50 px-4 py-1.5 text-small font-semibold text-danger hover:bg-red-100"
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main className="pt-16">
        <div className="mx-auto max-w-6xl p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default LayoutStudent
