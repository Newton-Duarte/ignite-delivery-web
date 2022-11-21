import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'

interface DeliveriesProviderProps {
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

interface DeliveriesContextData {
  deliveries: Delivery[]
}

const DeliveriesContext = createContext({} as DeliveriesContextData)

export function useDeliveries() {
  const context = useContext(DeliveriesContext)

  return context
}

export function DeliveriesProvider({ children }: DeliveriesProviderProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])

  useEffect(() => {
    api
      .get('/deliveries')
      .then((response) => setDeliveries(response.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <DeliveriesContext.Provider value={{ deliveries }}>
      {children}
    </DeliveriesContext.Provider>
  )
}
