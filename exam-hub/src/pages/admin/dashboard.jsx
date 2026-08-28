import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchStudents, fetchCourses, fetchExams } from '../../services/MockApi.js'
const QUICK_LINKS = [
  { to: '/admin/students', label: 'Gérer les étudiants', icon: '◍' },
  { to: '/admin/courses', label: 'Gérer les cours', icon: '▤' },
  { to: '/admin/exams', label: 'Gérer les examens', icon: '✓' },
]
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let active = true
    Promise.all([fetchStudents(), fetchCourses(), fetchExams()]).then(() => {
      if (active) setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [])
  const stats = [
    { label: 'Étudiants', value: 24, color: 'text-secondary', bg: 'bg-blue-50' },
    { label: 'Cours', value: 5, color: 'text-success', bg: 'bg-green-50' },
    { label: 'Examens', value: 8, color: 'text-primary', bg: 'bg-slate-100' },
    { label: 'Tentatives', value: 42, color: 'text-danger', bg: 'bg-red-50' },
  ]
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1>Tableau de bord</h1>
        <p className="text-small text-text-secondary">Vue d'ensemble de la plateforme</p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-6 shadow-card">
            {isLoading ? (
              <>
                <Skeleton height={36} width="60%" className="mb-3" />
                <Skeleton height={14} width="40%" />
              </>
            ) : (
              <>
                <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-small text-text-secondary">{s.label}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-4">Accès rapides</h2>
        <div className="grid grid-cols-3 gap-6">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-secondary">
                {link.icon}
              </span>
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
