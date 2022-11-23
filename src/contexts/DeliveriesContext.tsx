import { createContext, ReactNode, useContext, useState } from 'react'
import { useLoading } from '../hooks/useLoading'
import { api } from '../services/api'
import { useSnackbar } from './snackbar'

interface DeliveriesProviderProps {
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

interface Delivery {
  id: string
  client: Client
  item_name: string
  address?: string
  deliveryman?: Deliveryman
  created_at: string
  end_at?: string
}

interface DeliveryFormData {
  item_name: string
  address: string
}

interface DeliveriesContextData {
  deliveries: Delivery[]
  loading: boolean
  loadingCreateDelivery: boolean
  fetchDeliveries: () => void
  createDelivery: (data: DeliveryFormData, onSuccess: () => void) => void
}

const DeliveriesContext = createContext({} as DeliveriesContextData)

export function useDeliveries() {
  const context = useContext(DeliveriesContext)

  return context
}

export function DeliveriesProvider({ children }: DeliveriesProviderProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const { loading, setLoading } = useLoading(false)
  const {
    loading: loadingCreateDelivery,
    setLoading: setLoadingCreateDelivery,
  } = useLoading(false)

  const { showSnackbarMessage } = useSnackbar()

  async function fetchDeliveries() {
    setLoading(true)

    try {
      const response = await api.get('/deliveries')
      setDeliveries(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      showSnackbarMessage('Erro ao listar entregas disponíveis')
      setLoading(false)
    }
  }

  async function createDelivery(data: DeliveryFormData, onSuccess: () => void) {
    setLoadingCreateDelivery(true)

    try {
      const response = await api.post('/deliveries', data)

      setDeliveries([...deliveries, response.data])
      showSnackbarMessage('Entrega adicionada com sucesso!')
      setLoadingCreateDelivery(false)
      onSuccess()
    } catch (error) {
      console.log(error)
      showSnackbarMessage('Ocorreu um erro ao adicionar a entrega.')
      setLoadingCreateDelivery(false)
    }
  }

  return (
    <DeliveriesContext.Provider
      value={{
        deliveries,
        loading,
        loadingCreateDelivery,
        fetchDeliveries,
        createDelivery,
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  )
}
