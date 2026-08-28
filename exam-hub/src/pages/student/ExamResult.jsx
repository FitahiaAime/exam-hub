import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchExamCorrection } from '../../services/MockApi.js'
const ExamResult = () => {
  const { id } = useParams()
  const [correction, setCorrection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchExamCorrection(id).then((data) => {
      setCorrection(data)
      setIsLoading(false)
    })
  }, [id])
  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Skeleton height={140} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </div>
    )
  }
  if (!correction) {
    return <p className="text-text-secondary">Aucune correction disponible pour cet examen.</p>
  }
  const passed = correction.score >= correction.scale / 2
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <p className={`text-5xl font-extrabold ${passed ? 'text-success' : 'text-danger'}`}>
          {correction.score}
          <span className="text-2xl text-text-secondary">/{correction.scale}</span>
        </p>
        <p className={`text-body font-bold ${passed ? 'text-success' : 'text-danger'}`}>
          {passed ? 'Examen réussi' : 'Examen non validé'}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2>Détail des réponses</h2>
        {correction.questions.map((q, index) => {
          const isCorrect = q.studentChoiceId === q.correctChoiceId
          return (
            <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="mb-4 font-semibold">
                {index + 1}. {q.statement}
              </p>
              <div className="flex flex-col gap-2">
                {q.choices.map((choice) => {
                  const isStudentChoice = choice.id === q.studentChoiceId
                  const isCorrectChoice = choice.id === q.correctChoiceId
                  let style = 'border-slate-200 text-text-secondary'
                  let suffix = ''
                  if (isCorrectChoice) {
                    style = 'border-success bg-green-50 text-green-800 font-medium'
                    suffix = isStudentChoice ? ' (votre réponse — correcte)' : ' (bonne réponse)'
                  } else if (isStudentChoice) {
                    style = 'border-danger bg-red-50 text-red-800 font-medium'
                    suffix = ' (votre réponse)'
                  }
                  return (
                    <div key={choice.id} className={`rounded-lg border px-4 py-2.5 text-small ${style}`}>
                      {choice.label}
                      {suffix}
                    </div>
                  )
                })}
              </div>
              <p className={`mt-3 text-small font-semibold ${isCorrect ? 'text-success' : 'text-danger'}`}>
                {isCorrect ? '✓ Bonne réponse' : '✕ Réponse incorrecte'}
              </p>
            </div>
          )
        })}
      </div>
      <Link to="/student/results" className="text-small font-semibold text-secondary hover:underline">
        Voir tout mon historique →
      </Link>
    </div>
  )
}
export default ExamResult
