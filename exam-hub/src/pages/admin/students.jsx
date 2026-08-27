import { useEffect, useState } from 'react'
import Table from '../../components/ui/table.jsx'
import Badge from '../../components/ui/badge.jsx'
import Button from '../../components/ui/button.jsx'
import Modal from '../../components/ui/modal.jsx'
import Input from '../../components/ui/input.jsx'
import { fetchStudents } from '../../services/MockApi.js'
import { useToast } from '../../context/ToastContext.jsx'
import { validateStudent, hasErrors } from '../../utils/validation.js'
const COLUMNS = [
  { key: 'name', label: 'Nom', render: (r) => <span className="font-semibold">{r.name}</span> },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Statut',
    render: (r) => <Badge variant={r.status === 'active' ? 'active' : 'inactive'}>{r.status === 'active' ? 'Actif' : 'Désactivé'}</Badge>,
  },
]
const Students = () => {
  const { showToast } = useToast()
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data)
      setIsLoading(false)
    })
  }, [])
  const openModal = () => {
    setForm({ name: '', email: '', password: '' })
    setErrors({})
    setIsModalOpen(true)
  }
  const handleCreate = () => {
    const validationErrors = validateStudent(form)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return
    setIsSaving(true)
    setTimeout(() => {
      setStudents((prev) => [
        ...prev,
        { id: `st-${Date.now()}`, name: form.name, email: form.email, status: 'active', enrolledAt: new Date().toISOString().slice(0, 10) },
      ])
      setIsSaving(false)
      setIsModalOpen(false)
      showToast('success', `Compte créé pour ${form.name}`)
    }, 700)
  }
  const toggleStatus = (student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    )
    showToast('info', `${student.name} est maintenant ${student.status === 'active' ? 'désactivé' : 'actif'}.`)
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Étudiants</h1>
          <p className="text-small text-text-secondary">{students.length} comptes enregistrés</p>
        </div>
        <Button onClick={openModal}>+ Créer un étudiant</Button>
      </div>
      <Table
        columns={COLUMNS}
        data={students}
        isLoading={isLoading}
        emptyMessage="Aucun étudiant pour le moment."
        actions={(row) => (
          <Button variant="secondary" size="sm" onClick={() => toggleStatus(row)}>
            {row.status === 'active' ? 'Désactiver' : 'Réactiver'}
          </Button>
        )}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreate}
        title="Créer un étudiant"
        confirmText="Créer le compte"
        isConfirmLoading={isSaving}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nom complet"
            placeholder="Ex. Sophie Dubois"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="sophie.dubois@mail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Mot de passe temporaire"
            type="password"
            placeholder="8 caractères minimum"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
        </div>
      </Modal>
    </div>
  )
}
export default Students
