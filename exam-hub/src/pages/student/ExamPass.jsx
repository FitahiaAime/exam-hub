import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Button from '../../components/ui/button.jsx'
import Modal from '../../components/ui/modal.jsx'
import Spinner from '../../components/ui/spinner.jsx'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchExamById, fetchExamQuestionsForStudent, submitExamAttempt } from '../../services/MockApi.js'
import { useToast } from '../../context/ToastContext.jsx'
import { getErrorMessage } from '../../utils/ErrorMessages.js'
const ExamPass = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    Promise.all([fetchExamById(id), fetchExamQuestionsForStudent(id)]).then(([examData, qs]) => {
      setExam(examData)
      setQuestions(qs)
      setIsLoading(false)
    })
  }, [id])
  const answeredCount = Object.keys(answers).length
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true)
    try {
      const result = await submitExamAttempt(id, answers)
      navigate(result.correctionUrl)
    } catch (err) {
      setIsSubmitting(false)
      setIsConfirmOpen(false)
      showToast('error', getErrorMessage(err))
    }
  }
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton height={28} width={360} />
        <Skeleton height={120} />
        <Skeleton height={120} />
      </div>
    )
  }
  return (
    <div className="relative">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <p className="text-small text-text-secondary">{exam?.courseName}</p>
          <h1>{exam?.title}</h1>
          <p className="mt-1 text-small text-text-secondary">
            {answeredCount} / {questions.length} questions répondues
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="mb-4 text-body font-semibold">
                {index + 1}. {q.statement}
              </p>
              <div className="flex flex-col gap-3">
                {q.choices.map((choice) => {
                  const selected = answers[q.id] === choice.id
                  return (
                    <label
                      key={choice.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                        selected ? 'border-secondary bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={selected}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: choice.id }))}
                        className="h-4 w-4 accent-secondary"
                      />
                      <span className={selected ? 'font-medium text-text' : 'text-text-secondary'}>{choice.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Link to="/student" className="text-small font-semibold text-secondary hover:underline">
            ← Retour aux examens
          </Link>
          <Button onClick={() => setIsConfirmOpen(true)}>Soumettre</Button>
        </div>
      </div>
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmer la soumission ?"
        confirmText="Soumettre l'examen"
        isConfirmLoading={isSubmitting}
      >
        <p className="text-body text-text-secondary">
          Vous avez répondu à {answeredCount} question{answeredCount > 1 ? 's' : ''} sur {questions.length}.
        </p>
        <p className="mt-2 text-body text-text-secondary">
          Cette action est définitive et ne peut pas être annulée (RG-02).
        </p>
      </Modal>
      {isSubmitting && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-slate-900/60">
          <Spinner size={40} color="#ffffff" />
          <p className="font-semibold text-white">Calcul du résultat en cours...</p>
        </div>
      )}
    </div>
  )
}
export default ExamPass
