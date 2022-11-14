import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react'
import CreateDelivery from '../components/CreateDelivery'
import ListLoading from '../components/ListLoading'

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
          <Table aria-label="available-deliveries-table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Encomenda</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Endereço
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(30).keys()].map((n) => (
                <TableRow key={n}>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Coxinha</TableCell>
                  <TableCell>Rua Ali Perto, 123 - Bairro Cidade/ST</TableCell>
                  <TableCell>
                    <Chip label="Entregue" color="success" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  )
}
