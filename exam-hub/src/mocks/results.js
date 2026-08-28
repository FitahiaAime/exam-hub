export const mockExamResults = {
  ex1: {
    average: 12.4,
    scale: 20,
    rows: [
      { id: 'r1', studentName: 'Alice Martin', score: 16, attemptCount: 1 },
      { id: 'r2', studentName: 'Karim Belkacem', score: 9, attemptCount: 1 },
      { id: 'r3', studentName: 'Sophie Dubois', score: 18, attemptCount: 1 },
      { id: 'r4', studentName: 'Yanis Cherif', score: 11, attemptCount: 1 },
      { id: 'r5', studentName: 'Mélissa Rakoto', score: 8, attemptCount: 2 },
    ],
  },
}
export const mockStudentHistory = [
  {
    id: 'att1',
    examId: 'ex3',
    examTitle: 'Contrôle SVT',
    date: '2026-02-15',
    score: 9,
    scale: 20,
  },
  {
    id: 'att2',
    examId: 'ex2',
    examTitle: 'Quiz Histoire',
    date: '2026-02-28',
    score: 14,
    scale: 20,
  },
  {
    id: 'att3',
    examId: 'ex1',
    examTitle: 'Examen Final - Mathématiques',
    date: '2026-03-12',
    score: 18,
    scale: 20,
  },
]
export const mockExamCorrection = {
  ex1: {
    score: 18,
    scale: 20,
    questions: [
      {
        id: 'q1',
        statement: 'Quelle est la dérivée de la fonction f(x) = x² ?',
        studentChoiceId: 'b',
        correctChoiceId: 'b',
        choices: [
          { id: 'a', label: "f'(x) = x" },
          { id: 'b', label: "f'(x) = 2x" },
          { id: 'c', label: "f'(x) = x²" },
          { id: 'd', label: "f'(x) = 2" },
        ],
      },
      {
        id: 'q2',
        statement: 'Quelle est la capitale de la France ?',
        studentChoiceId: 'a',
        correctChoiceId: 'c',
        choices: [
          { id: 'a', label: 'Lyon' },
          { id: 'b', label: 'Marseille' },
          { id: 'c', label: 'Paris' },
          { id: 'd', label: 'Nice' },
        ],
      },
      {
        id: 'q3',
        statement: 'Combien vaut 2 + 2 × 2 ?',
        studentChoiceId: 'b',
        correctChoiceId: 'b',
        choices: [
          { id: 'a', label: '8' },
          { id: 'b', label: '6' },
          { id: 'c', label: '4' },
          { id: 'd', label: '2' },
        ],
      },
    ],
  },
}
