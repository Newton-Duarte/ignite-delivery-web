import {
  Paper,
  Typography,
  Container,
  Avatar,
  Divider,
  Box,
} from '@mui/material'
import UserDeliveriesList from '../components/UserDeliveriesList'
import { useAuth } from '../contexts/AuthContext'
import { UserDeliveriesProvider } from '../contexts/UserDeliveriesContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        my: 5,
      }}
    >
      <Paper
        sx={{
          width: {
            xs: '100%',
            sm: 600,
          },
          p: 3,
        }}
      >
        <Avatar
          alt={user?.name}
          sx={{
            width: 128,
            height: 128,
            fontSize: '2.125rem',
            margin: '0 auto',
          }}
        >
          {user?.name.split(' ')[0][0]}
          {user?.name.split(' ')[1][0]}
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
          {user?.name}
        </Typography>
        <Divider />
        <Box>
          <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
            {user?.deliveries?.length || 0}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Entregas
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          width: {
            xs: '100%',
            sm: 800,
          },
          mt: 3,
        }}
      >
        <UserDeliveriesProvider>
          <UserDeliveriesList />
        </UserDeliveriesProvider>
      </Paper>
    </Container>
  )
}
