import { fetchWithAuth } from './fetchWithAuth.js'

export const fetchStudents = () => fetchWithAuth('/students')

export const fetchCourses = () => fetchWithAuth('/courses')

export const fetchExams = () => fetchWithAuth('/exams')

export const fetchExamById = (examId) => fetchWithAuth(`/exams/${examId}`)

export const fetchExamQuestionsForAdmin = async (examId) => {
  const [exam, questions] = await Promise.all([
    fetchWithAuth(`/exams/${examId}`),
    fetchWithAuth(`/exams/${examId}/questions`),
  ])
  return { locked: (exam?.attemptCount ?? 0) > 0, questions }
}

export const fetchExamQuestionsForStudent = (examId) => fetchWithAuth(`/my/exams/${examId}`)

export const fetchExamResults = async (examId) => {
  const data = await fetchWithAuth(`/exams/${examId}/results`)
  const list = data.rows ?? data.results ?? (Array.isArray(data) ? data : [])
  const rows = list.map((r) => ({
    studentName: r.nom ?? r.studentName ?? '',
    score: r.note ?? r.score ?? 0,
    attemptCount: r.tentatives ?? r.attemptCount ?? 0,
  }))
  return { average: data.average ?? data.moyenne ?? 0, scale: 20, rows }
}

export const fetchStudentHistory = () => fetchWithAuth('/my/results')

export const fetchExamCorrection = (examId) => fetchWithAuth(`/my/results/${examId}`)

export const submitExamAttempt = (examId, answers) => {
  const reponses = Object.entries(answers).map(([questionId, choiceId]) => ({ questionId, choiceId }))
  return fetchWithAuth(`/my/exams/${examId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ reponses }),
  })
}