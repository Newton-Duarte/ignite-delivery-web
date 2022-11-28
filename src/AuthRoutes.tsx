import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function AuthRoutes() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
