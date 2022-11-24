import { useEffect } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
  TableContainer,
  Pagination,
} from '@mui/material'
import { useDeliveries } from '../contexts/DeliveriesContext'
import noDataSvg from '../assets/undraw_no_data.svg'
import ListLoading from './ListLoading'
import { useAuth } from '../contexts/AuthContext'

export default function DeliveriesList() {
  const { fetchDeliveries, deliveries, loading } = useDeliveries()
  const { isDeliveryman } = useAuth()

  useEffect(() => {
    fetchDeliveries()
  }, [])

  return (
    <>
      {!deliveries?.length || loading ? (
        <ListLoading />
      ) : deliveries?.length ? (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: {
              xs: 640,
              sm: 740,
            },
          }}
        >
          <Table aria-label="available-deliveries-table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Encomenda</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Endereço
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Criado em
                </TableCell>
                {isDeliveryman && (
                  <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                    Ações
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.client.name}</TableCell>
                  <TableCell>{delivery.item_name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat().format(
                      new Date(delivery.created_at),
                    )}
                  </TableCell>
                  {isDeliveryman && (
                    <TableCell>
                      <Button variant="contained">Realizar Entrega</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={10}
            color="primary"
            sx={{
              '.MuiPagination-ul': {
                justifyContent: 'center',
                my: 2,
              },
            }}
          />
        </TableContainer>
      ) : (
        <Paper
          sx={{
            width: {
              xs: '100%',
              sm: 400,
            },
            p: 5,
            margin: '0 auto',
          }}
        >
          <img src={noDataSvg} alt="empty data" style={{ maxWidth: '100%' }} />
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Nenhuma entrega encontrada
          </Typography>
        </Paper>
      )}
    </>
  )
}
