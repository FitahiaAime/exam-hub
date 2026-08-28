import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Input from '../components/ui/input.jsx'
import Button from '../components/ui/button.jsx'
import Toast from '../components/ui/toast.jsx'
import { useAuth } from '../context/MockAuthContext.jsx'
import { validateLogin, hasErrors } from '../utils/validation.js'
const Login = () => {
  const { login, isLoggingIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateLogin({ email, password })
    setFieldErrors(errors)
    setApiError(null)
    if (hasErrors(errors)) return
    try {
      const user = await login(email, password)
      const redirectTo = location.state?.from ?? (user.role === 'admin' ? '/admin' : '/student')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setApiError(err.message)
    }
  }
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-white">
          EH
        </span>
        <h1 className="text-h1">Exam Hub</h1>
        <p className="text-small text-text-secondary">Connexion à votre espace</p>
      </div>
      {apiError && (
        <div className="mb-4">
          <Toast type="error" message={apiError} onClose={() => setApiError(null)} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-card">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
        <div className="-mt-2 text-right">
          <button type="button" className="text-small font-semibold text-secondary hover:underline">
            Mot de passe oublié ?
          </button>
        </div>
        <Button type="submit" isLoading={isLoggingIn} size="lg" className="w-full">
          {isLoggingIn ? 'Connexion...' : 'Se connecter'}
        </Button>
        <p className="text-center text-xs text-text-secondary">
          Démo : un email contenant « admin » connecte en administrateur, sinon en étudiant.
          <br />
          Utilisez « desactive@examhub.fr » pour voir le message RG-11.
        </p>
      </form>
    </div>
  )
}
export default Login
