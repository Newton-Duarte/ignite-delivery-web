/* eslint-disable dot-notation */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useSnackbar } from './snackbar'

const LOCAL_STORAGE_USER_KEY = 'ignitedelivery.user'
const LOCAL_STORAGE_TOKEN_KEY = 'ignitedelivery.token'
const LOCAL_STORAGE_LOGIN_TYPE_KEY = 'ignitedelivery.logintype'

interface User {
  id: string
  name: string
  username: string
  address?: string
}

type SignInResponse = {
  user: User
  token: string
}

interface AuthContextData {
  user: User | undefined
  signIn: (loginType: string, username: string, password: string) => void
  signOut: () => void
  isAuthenticated: boolean
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
  const [currentUser, setCurrentUser] = useState<User>()
  const isAuthenticated = !!currentUser

  const navigate = useNavigate()
  const { showSnackbarMessage } = useSnackbar()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const loginType = localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY)
      const URL = loginType === 'customer' ? '/clients/me' : '/deliverymen/me'

      api
        .get(URL)
        .then((response) => {
          const user = response.data

          setCurrentUser({ ...user })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn(loginType: string, username: string, password: string) {
    const URL =
      loginType === 'customer'
        ? '/clients/authenticate'
        : '/deliverymen/authenticate'

    try {
      const response = await api.post<SignInResponse>(URL, {
        username,
        password,
      })

      const { user, token } = response.data

      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
      localStorage.setItem(LOCAL_STORAGE_LOGIN_TYPE_KEY, loginType)

      setCurrentUser({ ...user })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      showSnackbarMessage('Login efetuado com sucesso')

      navigate('/')
    } catch (error) {
      showSnackbarMessage('Usuário ou senha inválidos')
    }
  }

  function signOut() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user: currentUser, signIn, isAuthenticated, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
