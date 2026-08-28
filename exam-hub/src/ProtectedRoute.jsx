import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/MockAuthContext.jsx'
const ProtectedRoute = ({ allowedRole, children }) => {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin' : '/student'} replace />
  }
  return children
}
export default ProtectedRoute
