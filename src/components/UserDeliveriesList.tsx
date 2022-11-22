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
} from '@mui/material'
import { useUserDeliveries } from '../contexts/UserDeliveriesContext'
import noDataSvg from '../assets/undraw_no_data.svg'

export default function UserDeliveriesList() {
  const { deliveries } = useUserDeliveries()

  return (
    <>
      {deliveries?.length ? (
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
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.client}</TableCell>
                  <TableCell>{delivery.item_name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>
                    <Chip label="Entregue" color="success" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
