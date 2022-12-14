/* eslint-disable dot-notation */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../hooks/useLoading'
import { api } from '../services/api'
import { useSnackbar } from './snackbar'
import { Delivery } from './UserDeliveriesContext'

const LOCAL_STORAGE_USER_KEY = 'ignitedelivery.user'
const LOCAL_STORAGE_TOKEN_KEY = 'ignitedelivery.token'
const LOCAL_STORAGE_LOGIN_TYPE_KEY = 'ignitedelivery.logintype'

interface User {
  id: string
  name: string
  username: string
  address?: string
  deliveries?: Delivery[]
}

type SignInResponse = {
  user: User
  token: string
}

interface AuthContextData {
  user: User | null | undefined
  signIn: (loginType: string, username: string, password: string) => void
  signUp: (
    loginType: string,
    name: string,
    username: string,
    password: string,
    address?: string,
  ) => void
  signOut: () => void
  isAuthenticated: boolean
  isClient: boolean
  isDeliveryman: boolean
  loading: boolean
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
  const { loading, setLoading } = useLoading(true)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>()
  const isAuthenticated = !!currentUser
  const isClient =
    localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY) === 'customer'
  const isDeliveryman =
    localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY) === 'deliveryman'

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
    } else {
      setCurrentUser(null)
    }

    setLoading(false)
  }, [])

  async function signIn(loginType: string, username: string, password: string) {
    setLoading(true)

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

      setLoading(false)
      navigate('/')
    } catch (error) {
      showSnackbarMessage('Usu??rio ou senha inv??lidos')
      setLoading(false)
    }
  }

  async function signUp(
    loginType: string,
    name: string,
    username: string,
    password: string,
    address?: string,
  ) {
    setLoading(true)

    const URL = loginType === 'customer' ? '/clients' : '/deliverymen'

    try {
      await api.post<User>(URL, {
        name,
        username,
        password,
        address,
      })
      showSnackbarMessage(
        'Cadastro efetuado com sucesso, voc?? j?? pode efetuar o login',
      )

      setLoading(false)
      navigate('/login')
    } catch (error: any) {
      const message = error?.response?.data?.message
      const errorMessage =
        message === 'Deliveryman already exists!'
          ? 'O Usu??rio informado j?? existe'
          : 'Ocorreu um erro ao realizar o cadastro'
      showSnackbarMessage(errorMessage)
      setLoading(false)
    }
  }

  function signOut() {
    setCurrentUser(null)
    localStorage.clear()
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signIn,
        isAuthenticated,
        isClient,
        isDeliveryman,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
