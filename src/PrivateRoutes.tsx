import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export function PrivateRoutes() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
