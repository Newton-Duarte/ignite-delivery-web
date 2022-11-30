import { UserDeliveriesProvider } from '../contexts/UserDeliveriesContext'
import { Profile } from './Profile'

export default function ProfileContainer() {
  return (
    <UserDeliveriesProvider>
      <Profile />
    </UserDeliveriesProvider>
  )
}
