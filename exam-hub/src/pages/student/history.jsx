import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/ui/table.jsx'
import { fetchStudentHistory } from '../../services/MockApi.js'
const History = () => {
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchStudentHistory().then((data) => {
      setHistory(data)
      setIsLoading(false)
    })
  }, [])
  const columns = [
    { key: 'examTitle', label: 'Examen', render: (r) => <span className="font-semibold">{r.examTitle}</span> },
    { key: 'date', label: 'Date', render: (r) => new Date(r.date).toLocaleDateString('fr-FR') },
    { key: 'score', label: 'Note', render: (r) => <span className="font-bold">{r.score}/{r.scale}</span> },
  ]
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>Historique des examens</h1>
        <p className="text-small text-text-secondary">{history.length} examen(s) passé(s)</p>
      </div>
      <Table
        columns={columns}
        data={history}
        isLoading={isLoading}
        emptyMessage="Vous n'avez encore passé aucun examen."
        actions={(row) => (
          <Link to={`/student/exams/${row.examId}/result`} className="text-small font-semibold text-secondary hover:underline">
            Voir le détail →
          </Link>
        )}
      />
    </div>
  )
}
export default History
