import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'

interface UserDeliveriesProviderProps {
  children: ReactNode
}

interface Delivery {
  id: string
  client: string
  item_name: string
  address?: string
  deliveryman?: string
  created_at: string
  end_at?: string
}

interface UserDeliveriesContextData {
  deliveries: Delivery[]
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
  const [deliveries, setUserDeliveries] = useState<Delivery[]>([])

  useEffect(() => {
    const loginType = localStorage.getItem(LOCAL_STORAGE_LOGIN_TYPE_KEY)
    const URL =
      loginType === 'customer'
        ? '/clients/deliveries'
        : '/deliverymen/deliveries'

    api
      .get(URL)
      .then((response) => setUserDeliveries(response.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <UserDeliveriesContext.Provider value={{ deliveries }}>
      {children}
    </UserDeliveriesContext.Provider>
  )
}
