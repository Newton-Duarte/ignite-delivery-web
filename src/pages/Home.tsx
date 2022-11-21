import { Paper, TableContainer, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react'
import DeliveriesList from '../components/DeliveriesList'
import ListLoading from '../components/ListLoading'
import { DeliveriesProvider } from '../contexts/DeliveriesContext'

export function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Entregas disponíveis
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: {
            xs: 640,
            sm: 740,
          },
        }}
      >
        {loading ? (
          <ListLoading />
        ) : (
          <DeliveriesProvider>
            <DeliveriesList />
          </DeliveriesProvider>
        )}
      </TableContainer>
    </Container>
  )
}
