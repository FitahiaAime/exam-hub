import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/button.jsx'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchExams } from '../../services/MockApi.js'
import { mockStudentHistory } from '../../mocks/results.js'
const Home = () => {
  const navigate = useNavigate()
  const [exams, setExams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchExams().then((data) => {
      const now = new Date()
      const visible = data.filter((e) => e.status === 'published' && new Date(e.endsAt) >= now)
      setExams(visible)
      setIsLoading(false)
    })
  }, [])
  const alreadyPassedIds = new Set(mockStudentHistory.map((h) => h.examId))
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>Examens disponibles</h1>
        <p className="text-small text-text-secondary">
          {isLoading ? 'Chargement…' : `${exams.length} examen(s) disponible(s)`}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Skeleton height={12} width="50%" className="mb-3" />
              <Skeleton height={22} width="80%" className="mb-2" />
              <Skeleton height={12} width="60%" className="mb-6" />
              <Skeleton height={40} />
            </div>
          ))}
        {!isLoading && exams.length === 0 && (
          <p className="col-span-3 py-12 text-center text-text-secondary">
            Aucun examen disponible pour le moment.
          </p>
        )}
        {!isLoading &&
          exams.map((exam) => {
            const alreadyPassed = alreadyPassedIds.has(exam.id)
            return (
              <div key={exam.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <p className="text-label font-bold uppercase tracking-wide text-secondary">{exam.courseName}</p>
                <h3 className="mt-2 text-body font-bold">{exam.title}</h3>
                <p className="mt-1 text-small text-text-secondary">
                  {exam.durationMinutes} min · {exam.questionCount} questions
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Disponible jusqu'au {new Date(exam.endsAt).toLocaleDateString('fr-FR')}
                </p>
                <div className="mt-6">
                  <Button
                    className="w-full"
                    disabled={alreadyPassed}
                    onClick={() => navigate(`/student/exams/${exam.id}`)}
                  >
                    {alreadyPassed ? 'Déjà passé' : "Commencer l'examen"}
                  </Button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default Home
