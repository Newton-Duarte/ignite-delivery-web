import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useState } from 'react'
import CreateDelivery from '../components/CreateDelivery'
import DeliveriesList from '../components/DeliveriesList'
import { useAuth } from '../contexts/AuthContext'
import { DeliveriesProvider } from '../contexts/DeliveriesContext'

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isClient } = useAuth()

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Entregas disponíveis
        </Typography>
        {isClient && (
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Nova Entrega
          </Button>
        )}
      </Box>
      <DeliveriesProvider>
        <DeliveriesList />
        <CreateDelivery
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </DeliveriesProvider>
    </Container>
  )
}
