import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import { useDeliveries } from '../contexts/DeliveriesContext'

export default function DeliveriesList() {
  const { deliveries } = useDeliveries()

  return (
    <>
      {deliveries?.length ? (
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
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.client}</TableCell>
                <TableCell>{delivery.item_name}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>
                  <Button variant="contained">Realizar Entrega</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Lista vazia</p>
      )}
    </>
  )
}
