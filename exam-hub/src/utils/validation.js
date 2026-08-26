export const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? '')
}
export const validateLogin = ({ email, password }) => {
  const errors = {}
  if (!isValidEmail(email)) errors.email = 'Veuillez entrer un email valide'
  if (!password) errors.password = 'Le mot de passe est requis'
  return errors
}
export const validateStudent = ({ name, email, password }) => {
  const errors = {}
  if (!name?.trim()) errors.name = 'Le nom est requis'
  if (!isValidEmail(email)) errors.email = 'Veuillez entrer un email valide'
  if (!password || password.length < 8) errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
  return errors
}
export const validateCourse = ({ code, name }) => {
  const errors = {}
  if (!code?.trim()) errors.code = 'Le code est requis'
  if (!name?.trim()) errors.name = 'Le nom est requis'
  return errors
}
export const validateExam = ({ title, courseId, startsAt, endsAt }) => {
  const errors = {}
  if (!title?.trim()) errors.title = 'Le titre est requis'
  if (!courseId) errors.courseId = 'Veuillez sélectionner un cours'
  if (startsAt && new Date(startsAt) <= new Date()) errors.startsAt = 'La date de début doit être future'
  if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
    errors.endsAt = 'La date de fin doit être après la date de début'
  }
  return errors
}
export const validateQuestion = ({ statement, points, choices }) => {
  const errors = {}
  if (!statement?.trim()) errors.statement = "L'énoncé est requis"
  if (!(Number(points) > 0)) errors.points = 'Les points doivent être > 0'
  if (!choices || choices.length < 2 || choices.length > 6) {
    errors.choices = 'Une question doit avoir entre 2 et 6 choix'
  }
  const correctCount = choices?.filter((c) => c.isCorrect).length ?? 0
  if (correctCount !== 1) errors.correctChoice = 'Veuillez sélectionner une seule bonne réponse'
  return errors
}
export const hasErrors = (errors) => Object.keys(errors).length > 0
