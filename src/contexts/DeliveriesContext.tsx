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

interface DeliveriesData {
  data: Delivery[]
  total: number
}

interface FetchDeliveriesProps {
  page: number
  perPage: number
  search: string
  sortBy: string
  sort: 'asc' | 'desc'
}

interface DeliveriesContextData {
  deliveries: DeliveriesData
  loading: boolean
  loadingCreateDelivery: boolean
  fetchDeliveries: ({
    page,
    perPage,
    search,
    sortBy,
    sort,
  }: FetchDeliveriesProps) => void
  createDelivery: (data: DeliveryFormData, onSuccess: () => void) => void
  updateDelivery: (deliveryId: string, onSuccess: () => void) => void
}

const DeliveriesContext = createContext({} as DeliveriesContextData)

export function useDeliveries() {
  const context = useContext(DeliveriesContext)

  return context
}

export function DeliveriesProvider({ children }: DeliveriesProviderProps) {
  const [deliveries, setDeliveries] = useState<DeliveriesData>(
    {} as DeliveriesData,
  )
  const { loading, setLoading } = useLoading(false)
  const {
    loading: loadingCreateDelivery,
    setLoading: setLoadingCreateDelivery,
  } = useLoading(false)

  const { showSnackbarMessage } = useSnackbar()

  async function fetchDeliveries({
    page,
    perPage,
    search,
    sortBy,
    sort,
  }: FetchDeliveriesProps) {
    setLoading(true)

    try {
      const response = await api.get('/deliveries', {
        params: {
          page: page <= 0 ? 1 : page,
          per_page: perPage,
          search,
          sort_by: sortBy,
          sort,
        },
      })
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

      setDeliveries({
        ...deliveries,
        data: [...deliveries.data, { ...response.data }],
      })
      showSnackbarMessage('Entrega adicionada com sucesso!')
      setLoadingCreateDelivery(false)
      onSuccess()
    } catch (error) {
      console.log(error)
      showSnackbarMessage('Ocorreu um erro ao adicionar a entrega.')
      setLoadingCreateDelivery(false)
    }
  }

  async function updateDelivery(deliveryId: string, onSuccess: () => void) {
    setLoadingCreateDelivery(true)

    try {
      await api.put(`/deliveries/${deliveryId}`)
      showSnackbarMessage('Entrega atualizada com sucesso!')
      setLoadingCreateDelivery(false)
      onSuccess()
    } catch (error) {
      console.log(error)
      showSnackbarMessage('Ocorreu um erro ao atualizar a entrega.')
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
        updateDelivery,
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  )
}
