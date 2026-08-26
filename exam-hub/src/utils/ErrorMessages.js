export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}
export const HTTP_STATUS_MESSAGES = {
  400: 'Données invalides',
  401: 'Session expirée',
  403: 'Accès refusé',
  404: 'Élément non trouvé',
  409: 'Examen déjà passé',
  500: 'Erreur serveur, veuillez réessayer',
}
export const getErrorMessage = (error) => {
  if (error instanceof ApiError) {
    return error.message || HTTP_STATUS_MESSAGES[error.status] || 'Une erreur est survenue'
  }
  return error?.message || 'Une erreur est survenue'
}
