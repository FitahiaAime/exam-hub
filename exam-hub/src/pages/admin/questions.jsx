import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../../components/ui/button.jsx'
import Input from '../../components/ui/input.jsx'
import Skeleton from '../../components/ui/skeleton.jsx'
import { fetchExamById, fetchExamQuestionsForAdmin } from '../../services/MockApi.js'
import { useToast } from '../../context/ToastContext.jsx'
import { validateQuestion } from '../../utils/validation.js'
const QuestionCard = ({ question, index, locked, onChange, onRemove }) => {
  const [errors, setErrors] = useState({})
  const updateChoice = (choiceId, patch) => {
    onChange({
      ...question,
      choices: question.choices.map((c) => (c.id === choiceId ? { ...c, ...patch } : c)),
    })
  }
  const setCorrect = (choiceId) => {
    onChange({
      ...question,
      choices: question.choices.map((c) => ({ ...c, isCorrect: c.id === choiceId })),
    })
  }
  const addChoice = () => {
    if (question.choices.length >= 6) return
    const nextId = String.fromCharCode(97 + question.choices.length)
    onChange({ ...question, choices: [...question.choices, { id: nextId, label: '', isCorrect: false }] })
  }
  const removeChoice = (choiceId) => {
    if (question.choices.length <= 2) return
    onChange({ ...question, choices: question.choices.filter((c) => c.id !== choiceId) })
  }
  const handleBlurValidate = () => setErrors(validateQuestion(question))
  return (
    <div className={`rounded-2xl border p-6 ${locked ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-white'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-body font-bold">Question {index + 1}</h3>
        {!locked && (
          <button onClick={onRemove} className="text-small font-semibold text-danger hover:underline">
            Supprimer
          </button>
        )}
      </div>
      <Input
        label="Énoncé"
        value={question.statement}
        disabled={locked}
        onChange={(e) => onChange({ ...question, statement: e.target.value })}
        onBlur={handleBlurValidate}
        error={errors.statement}
      />
      <div className="mt-3 w-40">
        <Input
          label="Points"
          type="number"
          min="0"
          value={question.points}
          disabled={locked}
          onChange={(e) => onChange({ ...question, points: e.target.value })}
          onBlur={handleBlurValidate}
          error={errors.points}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-label font-medium text-text-secondary">
          Choix de réponse — cochez la bonne réponse
        </p>
        {question.choices.map((choice) => (
          <div key={choice.id} className="flex items-center gap-3">
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={choice.isCorrect}
              disabled={locked}
              onChange={() => setCorrect(choice.id)}
              className="h-4 w-4 accent-success"
            />
            <input
              type="text"
              value={choice.label}
              disabled={locked}
              onChange={(e) => updateChoice(choice.id, { label: e.target.value })}
              onBlur={handleBlurValidate}
              className={`h-9 flex-1 rounded-lg border px-3 text-small ${
                choice.isCorrect ? 'border-success bg-green-50' : 'border-slate-300'
              } ${locked ? 'bg-slate-50 text-text-secondary' : ''}`}
            />
            {!locked && question.choices.length > 2 && (
              <button onClick={() => removeChoice(choice.id)} className="text-text-secondary hover:text-danger" aria-label="Retirer ce choix">
                ✕
              </button>
            )}
          </div>
        ))}
        {errors.choices && <p className="text-small text-danger">{errors.choices}</p>}
        {errors.correctChoice && <p className="text-small text-danger">{errors.correctChoice}</p>}
        {!locked && question.choices.length < 6 && (
          <button onClick={addChoice} className="mt-1 self-start text-small font-semibold text-secondary hover:underline">
            + Ajouter un choix
          </button>
        )}
      </div>
    </div>
  )
}
const Questions = () => {
  const { id } = useParams()
  const { showToast } = useToast()
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [locked, setLocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    Promise.all([fetchExamById(id), fetchExamQuestionsForAdmin(id)]).then(([examData, { locked: isLocked, questions: qs }]) => {
      setExam(examData)
      setLocked(isLocked)
      setQuestions(qs)
      setIsLoading(false)
    })
  }, [id])
  const updateQuestion = (index, next) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? next : q)))
  }
  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        statement: '',
        points: 1,
        choices: [
          { id: 'a', label: '', isCorrect: true },
          { id: 'b', label: '', isCorrect: false },
        ],
      },
    ])
  }
  const handleSaveAll = () => {
    const allErrors = questions.map(validateQuestion)
    const hasAnyError = allErrors.some((e) => Object.keys(e).length > 0)
    if (hasAnyError) {
      showToast('error', 'Certaines questions sont invalides. Vérifiez les champs en rouge.')
      return
    }
    showToast('success', 'Questions enregistrées')
  }
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton height={28} width={320} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link to="/admin/exams" className="text-small font-semibold text-secondary hover:underline">
          ← Retour aux examens
        </Link>
        <h1 className="mt-2">{exam?.title}</h1>
        <p className="text-small text-text-secondary">Éditeur de questions</p>
      </div>
      {locked && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
          <span className="text-lg">🔒</span>
          <p className="text-small font-semibold text-amber-800">
            Verrouillé — Des tentatives existent. Les questions ne sont plus modifiables.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            locked={locked}
            onChange={(next) => updateQuestion(i, next)}
            onRemove={() => removeQuestion(i)}
          />
        ))}
      </div>
      {!locked && (
        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={addQuestion}>+ Ajouter une question</Button>
          <Button onClick={handleSaveAll}>Enregistrer les questions</Button>
        </div>
      )}
    </div>
  )
}
export default Questions
