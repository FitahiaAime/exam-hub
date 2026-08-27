import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Table from '../../components/ui/table.jsx'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchExamById, fetchExamResults } from '../../services/MockApi.js'
const COLUMNS = [
  { key: 'studentName', label: 'Étudiant', render: (r) => <span className="font-semibold">{r.studentName}</span> },
  { key: 'score', label: 'Note', render: (r) => <span className="font-bold">{r.score}/20</span> },
  { key: 'attemptCount', label: 'Nb tentatives' },
]
const Results = () => {
  const { id } = useParams()
  const [exam, setExam] = useState(null)
  const [results, setResults] = useState({ average: 0, rows: [] })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    Promise.all([fetchExamById(id), fetchExamResults(id)]).then(([examData, resultsData]) => {
      setExam(examData)
      setResults(resultsData)
      setIsLoading(false)
    })
  }, [id])
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link to="/admin/exams" className="text-small font-semibold text-secondary hover:underline">
          ← Retour aux examens
        </Link>
        <h1 className="mt-2">{exam?.title ?? 'Résultats'}</h1>
        <p className="text-small text-text-secondary">Résultats des étudiants</p>
      </div>
      <div className="rounded-2xl bg-blue-50 p-6">
        <p className="text-label font-semibold text-secondary">Moyenne de la classe</p>
        {isLoading ? (
          <Skeleton height={32} width={120} className="mt-2" />
        ) : (
          <p className="mt-1 text-3xl font-extrabold text-secondary">
            {results.average}/{results.scale}
          </p>
        )}
      </div>
      <Table columns={COLUMNS} data={results.rows} isLoading={isLoading} emptyMessage="Aucune tentative pour cet examen." />
    </div>
  )
}
export default Results
