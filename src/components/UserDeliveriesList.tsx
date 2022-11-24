import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
  Paper,
  TableContainer,
  Pagination,
} from '@mui/material'
import { useUserDeliveries } from '../contexts/UserDeliveriesContext'
import noDataSvg from '../assets/undraw_no_data.svg'
import ListLoading from './ListLoading'
import { useAuth } from '../contexts/AuthContext'
import { formatDate } from '../utils/formatDate'

export default function UserDeliveriesList() {
  const { deliveries, loading } = useUserDeliveries()
  const { isClient, isDeliveryman } = useAuth()

  return (
    <>
      {loading ? (
        <ListLoading />
      ) : deliveries?.total ? (
        <TableContainer
          sx={{
            maxHeight: {
              xs: 640,
              sm: 740,
            },
          }}
        >
          <Table size="small" aria-label="user-deliveries-table" stickyHeader>
            <TableHead>
              <TableRow>
                {isDeliveryman && (
                  <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                )}
                <TableCell sx={{ fontWeight: 'bold' }}>Encomenda</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Endereço</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Entregue em</TableCell>
                {isClient && (
                  <TableCell sx={{ fontWeight: 'bold' }}>Entregador</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.data.map((delivery) => (
                <TableRow key={delivery.id}>
                  {isDeliveryman && (
                    <TableCell>{delivery.client.name}</TableCell>
                  )}
                  <TableCell>{delivery.item_name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>
                    {delivery.end_at ? (
                      <Chip size="small" label="Entregue" color="success" />
                    ) : delivery.deliveryman ? (
                      <Chip size="small" label="Em Trânsito" color="info" />
                    ) : (
                      <Chip size="small" label="Pendente" color="warning" />
                    )}
                  </TableCell>
                  <TableCell>{formatDate(delivery.end_at)}</TableCell>
                  {isClient && (
                    <TableCell>{delivery.deliveryman?.name}</TableCell>
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
