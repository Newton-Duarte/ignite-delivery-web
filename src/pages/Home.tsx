import {
  Button,
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
import ListLoading from '../components/ListLoading'

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
          <Table aria-label="available-deliveries-table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Encomenda</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Endereço
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(30).keys()].map((n) => (
                <TableRow key={n}>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Coxinha</TableCell>
                  <TableCell>Rua Ali Perto, 123 - Barrio Cidade/ST</TableCell>
                  <TableCell>
                    <Button variant="contained">Realizar Entrega</Button>
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
