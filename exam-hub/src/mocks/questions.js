export const mockQuestionsByExam = {
  ex1: [
    {
      id: 'q1',
      statement: 'Quelle est la dérivée de la fonction f(x) = x² ?',
      points: 1,
      choices: [
        { id: 'a', label: "f'(x) = x", isCorrect: false },
        { id: 'b', label: "f'(x) = 2x", isCorrect: true },
        { id: 'c', label: "f'(x) = x²", isCorrect: false },
        { id: 'd', label: "f'(x) = 2", isCorrect: false },
      ],
    },
    {
      id: 'q2',
      statement: 'Quelle est la capitale de la France ?',
      points: 1,
      choices: [
        { id: 'a', label: 'Lyon', isCorrect: false },
        { id: 'b', label: 'Marseille', isCorrect: false },
        { id: 'c', label: 'Paris', isCorrect: true },
        { id: 'd', label: 'Nice', isCorrect: false },
      ],
    },
    {
      id: 'q3',
      statement: 'Combien vaut 2 + 2 × 2 ?',
      points: 1,
      choices: [
        { id: 'a', label: '8', isCorrect: false },
        { id: 'b', label: '6', isCorrect: true },
        { id: 'c', label: '4', isCorrect: false },
        { id: 'd', label: '2', isCorrect: false },
      ],
    },
  ],
  ex2: [
    {
      id: 'q1',
      statement: 'En quelle année a débuté la Révolution française ?',
      points: 1,
      choices: [
        { id: 'a', label: '1789', isCorrect: true },
        { id: 'b', label: '1799', isCorrect: false },
        { id: 'c', label: '1804', isCorrect: false },
      ],
    },
  ],
}
export const stripCorrectAnswers = (questions) => {
  return questions.map((q) => ({
    id: q.id,
    statement: q.statement,
    points: q.points,
    choices: q.choices.map((c) => ({ id: c.id, label: c.label })),
  }))
}
