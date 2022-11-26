import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLoading } from '../hooks/useLoading'
import { api } from '../services/api'
import { useAuth } from './AuthContext'
import { useSnackbar } from './snackbar'

interface UserDeliveriesProviderProps {
  children: ReactNode
}

interface Client {
  id: string
  name: string
  address: string
}

interface Deliveryman {
  id: string
  name: string
}

export interface Delivery {
  id: string
  client: Client
  item_name: string
  address?: string
  deliveryman?: Deliveryman
  created_at: string
  end_at?: string
}

interface FetchUserDeliveriesProps {
  page: number
}

interface DeliveriesData {
  data: Delivery[]
  total: number
}

interface UserDeliveriesContextData {
  deliveries: DeliveriesData
  loading: boolean
  fetchUserDeliveries: (data: FetchUserDeliveriesProps) => void
}

const LOCAL_STORAGE_LOGIN_TYPE_KEY = 'ignitedelivery.logintype'

const UserDeliveriesContext = createContext({} as UserDeliveriesContextData)

export function useUserDeliveries() {
  const context = useContext(UserDeliveriesContext)

  return context
}

export function UserDeliveriesProvider({
  children,
}: UserDeliveriesProviderProps) {
  const { isAuthenticated } = useAuth()
  const [deliveries, setUserDeliveries] = useState<DeliveriesData>(
    {} as DeliveriesData,
  )
  const { loading, setLoading } = useLoading(true)

  const { showSnackbarMessage } = useSnackbar()

  useEffect(() => {
    if (!isAuthenticated) return

    const loginType = localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY)
    const URL =
      loginType === 'customer'
        ? '/clients/deliveries'
        : '/deliverymen/deliveries'

    api
      .get(URL)
      .then((response) => {
        setUserDeliveries(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        showSnackbarMessage('Erro ao listar entregas do usuário')
        setLoading(false)
      })
  }, [isAuthenticated])

  // TODO: Need to paginate backend response
  function fetchUserDeliveries({ page = 1 }: FetchUserDeliveriesProps) {
    const loginType = localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY)
    const URL =
      loginType === 'customer'
        ? '/clients/deliveries'
        : '/deliverymen/deliveries'

    api
      .get(URL, {
        params: {
          page,
          per_page: 5,
        },
      })
      .then((response) => {
        setUserDeliveries(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        showSnackbarMessage('Erro ao listar entregas do usuário')
        setLoading(false)
      })
  }

  return (
    <UserDeliveriesContext.Provider
      value={{
        deliveries,
        loading,
        fetchUserDeliveries,
      }}
    >
      {children}
    </UserDeliveriesContext.Provider>
  )
}
