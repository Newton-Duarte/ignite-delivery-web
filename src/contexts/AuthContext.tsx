import { createContext, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  address?: string
}

interface AuthContextData {
  user: User
  signIn: (email: string, password: string) => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export function AuthProvider({ children }: AuthProviderProps) {
  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/clients/authenticate', {
        email,
        password,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user: {} as User, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
