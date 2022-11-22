import { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import CreateDelivery from '../components/CreateDelivery'
import ListLoading from '../components/ListLoading'
import { UserDeliveriesProvider } from '../contexts/UserDeliveriesContext'
import UserDeliveriesList from '../components/UserDeliveriesList'

export function UserDeliveries() {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <CreateDelivery
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => console.log(data)}
      />
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Minhas Entregas
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Nova Entrega
        </Button>
      </Box>
      {loading ? (
        <ListLoading />
      ) : (
        <UserDeliveriesProvider>
          <UserDeliveriesList />
        </UserDeliveriesProvider>
      )}
    </Container>
  )
}
