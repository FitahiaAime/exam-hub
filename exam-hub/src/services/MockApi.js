import { mockStudents } from '../mocks/students.js'
import { mockCourses } from '../mocks/courses.js'
import { mockExams } from '../mocks/exams.js'
import { mockQuestionsByExam, stripCorrectAnswers } from '../mocks/questions.js'
import { mockExamResults, mockStudentHistory, mockExamCorrection } from '../mocks/results.js'
import { ApiError } from '../utils/ErrorMessages.js'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const fetchStudents = async () => {
  await delay(700)
  return mockStudents
}
export const fetchCourses = async () => {
  await delay(700)
  return mockCourses
}
export const fetchExams = async () => {
  await delay(700)
  return mockExams
}
export const fetchExamById = async (examId) => {
  await delay(400)
  return mockExams.find((e) => e.id === examId) ?? null
}
export const fetchExamQuestionsForAdmin = async (examId) => {
  await delay(600)
  const exam = mockExams.find((e) => e.id === examId)
  const questions = mockQuestionsByExam[examId] ?? []
  return { locked: (exam?.attemptCount ?? 0) > 0, questions }
}
export const fetchExamQuestionsForStudent = async (examId) => {
  await delay(600)
  const questions = mockQuestionsByExam[examId] ?? []
  return stripCorrectAnswers(questions)
}
export const fetchExamResults = async (examId) => {
  await delay(700)
  return mockExamResults[examId] ?? { average: 0, scale: 20, rows: [] }
}
export const fetchStudentHistory = async () => {
  await delay(600)
  return mockStudentHistory
}
export const fetchExamCorrection = async (examId) => {
  await delay(500)
  return mockExamCorrection[examId] ?? null
}
export const submitExamAttempt = async (examId, answers) => {
  await delay(1400)
  if (examId === 'ex-force-error') {
    throw new ApiError(500, 'Erreur serveur, veuillez réessayer')
  }
  return { examId, correctionUrl: `/student/exams/${examId}/result` }
}
