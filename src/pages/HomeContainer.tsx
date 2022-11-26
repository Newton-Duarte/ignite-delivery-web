import { DeliveriesProvider } from '../contexts/DeliveriesContext'
import { Home } from './Home'

export default function HomeContainer() {
  return (
    <DeliveriesProvider>
      <Home />
    </DeliveriesProvider>
  )
}
