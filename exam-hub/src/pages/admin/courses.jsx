import { useEffect, useState } from 'react'
import Table from '../../components/ui/table.jsx'
import Button from '../../components/ui/button.jsx'
import Modal from '../../components/ui/modal.jsx'
import Input from '../../components/ui/input.jsx'
import { fetchCourses } from '../../services/MockApi.js'
import { useToast } from '../../context/ToastContext.jsx'
import { validateCourse, hasErrors } from '../../utils/validation.js'
const COLUMNS = [
  { key: 'code', label: 'Code', render: (r) => <span className="font-mono text-small font-semibold">{r.code}</span> },
  { key: 'name', label: 'Nom', render: (r) => <span className="font-semibold">{r.name}</span> },
  { key: 'description', label: 'Description', render: (r) => <span className="text-text-secondary">{r.description}</span> },
]
const Courses = () => {
  const { showToast } = useToast()
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', description: '' })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data)
      setIsLoading(false)
    })
  }, [])
  const openModal = () => {
    setForm({ code: '', name: '', description: '' })
    setErrors({})
    setIsModalOpen(true)
  }
  const handleCreate = () => {
    const validationErrors = validateCourse(form)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return
    setIsSaving(true)
    setTimeout(() => {
      setCourses((prev) => [...prev, { id: `c-${Date.now()}`, ...form, examCount: 0 }])
      setIsSaving(false)
      setIsModalOpen(false)
      showToast('success', `Cours « ${form.name} » ajouté`)
    }, 700)
  }
  const handleDelete = (course) => {
    if (course.examCount > 0) return
    setCourses((prev) => prev.filter((c) => c.id !== course.id))
    showToast('info', `Cours « ${course.name} » supprimé`)
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Cours</h1>
          <p className="text-small text-text-secondary">{courses.length} cours actifs</p>
        </div>
        <Button onClick={openModal}>+ Ajouter un cours</Button>
      </div>
      <Table
        columns={COLUMNS}
        data={courses}
        isLoading={isLoading}
        emptyMessage="Aucun cours pour le moment."
        actions={(row) => {
          const linked = row.examCount > 0
          return (
            <span title={linked ? 'Ce cours possède des examens' : undefined}>
              <Button variant="danger" size="sm" disabled={linked} onClick={() => handleDelete(row)}>
                Supprimer
              </Button>
            </span>
          )
        }}
      />
      <p className="text-small text-text-secondary">
        * La suppression est désactivée tant qu'un examen reste lié au cours (RG-09).
      </p>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreate}
        title="Ajouter un cours"
        confirmText="Ajouter"
        isConfirmLoading={isSaving}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Code"
            placeholder="Ex. MATH101"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            error={errors.code}
          />
          <Input
            label="Nom"
            placeholder="Ex. Mathématiques"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <Input
            label="Description"
            placeholder="Brève description du cours"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  )
}
export default Courses
