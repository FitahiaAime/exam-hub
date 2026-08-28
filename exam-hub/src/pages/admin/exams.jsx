import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/ui/table.jsx'
import Badge from '../../components/ui/badge.jsx'
import Button from '../../components/ui/button.jsx'
import Modal from '../../components/ui/modal.jsx'
import Input from '../../components/ui/input.jsx'
import { fetchExams, fetchCourses } from '../../services/MockApi.js'
import { useToast } from '../../context/ToastContext.jsx'
import { validateExam, hasErrors } from '../../utils/validation.js'
const emptyForm = { title: '', courseId: '', startsAt: '', endsAt: '' }
const Exams = () => {
  const { showToast } = useToast()
  const [exams, setExams] = useState([])
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    Promise.all([fetchExams(), fetchCourses()]).then(([examData, courseData]) => {
      setExams(examData)
      setCourses(courseData)
      setIsLoading(false)
    })
  }, [])
  const columns = [
    { key: 'title', label: 'Titre', render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'courseName', label: 'Cours' },
    {
      key: 'availability',
      label: 'Disponibilité',
      render: (r) => (
        <span className="text-small text-text-secondary">
          {new Date(r.startsAt).toLocaleDateString('fr-FR')} → {new Date(r.endsAt).toLocaleDateString('fr-FR')}
        </span>
      ),
    },
    { key: 'questionCount', label: 'Questions', render: (r) => `${r.questionCount} questions` },
    { key: 'attemptCount', label: 'Tentatives', render: (r) => r.attemptCount },
    {
      key: 'status',
      label: 'Statut',
      render: (r) => <Badge variant={r.status === 'published' ? 'active' : 'draft'}>{r.status === 'published' ? 'Publié' : 'Brouillon'}</Badge>,
    },
  ]
  const openModal = () => {
    setForm(emptyForm)
    setErrors({})
    setIsModalOpen(true)
  }
  const handleCreate = () => {
    const validationErrors = validateExam(form)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return
    setIsSaving(true)
    setTimeout(() => {
      const course = courses.find((c) => c.id === form.courseId)
      setExams((prev) => [
        ...prev,
        {
          id: `ex-${Date.now()}`,
          title: form.title,
          courseId: form.courseId,
          courseName: course?.name ?? '',
          startsAt: form.startsAt,
          endsAt: form.endsAt,
          questionCount: 0,
          attemptCount: 0,
          durationMinutes: 30,
          status: 'draft',
        },
      ])
      setIsSaving(false)
      setIsModalOpen(false)
      showToast('success', `Examen « ${form.title} » créé`)
    }, 700)
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Examens</h1>
          <p className="text-small text-text-secondary">{exams.length} examens créés</p>
        </div>
        <Button onClick={openModal}>+ Créer un examen</Button>
      </div>
      <Table
        columns={columns}
        data={exams}
        isLoading={isLoading}
        emptyMessage="Aucun examen pour le moment."
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <Link to={`/admin/exams/${row.id}/questions`}>
              <Button variant="secondary" size="sm">Questions</Button>
            </Link>
            <Link to={`/admin/exams/${row.id}/results`}>
              <Button variant="secondary" size="sm">Résultats</Button>
            </Link>
          </div>
        )}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreate}
        title="Créer un examen"
        confirmText="Créer l'examen"
        isConfirmLoading={isSaving}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Titre de l'examen"
            placeholder="Ex. Contrôle chapitre 3"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            error={errors.title}
          />
          <Input
            label="Cours associé"
            type="select"
            value={form.courseId}
            onChange={(e) => setForm({ ...form, courseId: e.target.value })}
            error={errors.courseId}
            options={[{ value: '', label: 'Sélectionner un cours' }, ...courses.map((c) => ({ value: c.id, label: c.name }))]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date de début"
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
              error={errors.startsAt}
            />
            <Input
              label="Date de fin"
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
              error={errors.endsAt}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Exams
