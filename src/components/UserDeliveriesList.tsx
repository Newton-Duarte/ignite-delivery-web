import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  TableFooter,
  TablePagination,
  Button,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Delivery } from '../contexts/UserDeliveriesContext'
import { formatDate } from '../utils/formatDate'

interface UserDeliveriesListProps {
  deliveries: Delivery[]
  total: number
  page: number
  perPage: number
  onChangePage: (newPage: number) => void
  onChangePerPage: (newPerPage: number) => void
  onConfirmDelivery: (deliveryId: string) => void
}

export default function UserDeliveriesList({
  deliveries,
  total,
  page,
  perPage,
  onChangePage,
  onChangePerPage,
  onConfirmDelivery,
}: UserDeliveriesListProps) {
  const { isDeliveryman, isClient } = useAuth()

  return (
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
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              {isDeliveryman && <TableCell>{delivery.client.name}</TableCell>}
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
              <TableCell>
                {isDeliveryman && delivery.deliveryman && !delivery.end_at ? (
                  <Button
                    size="small"
                    onClick={() => onConfirmDelivery(delivery.id)}
                  >
                    Confirmar entrega
                  </Button>
                ) : (
                  formatDate(delivery.end_at)
                )}
              </TableCell>
              {isClient && <TableCell>{delivery.deliveryman?.name}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={5}
              count={total}
              rowsPerPage={perPage}
              page={page - 1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
              }}
              onPageChange={(_, newPage) => onChangePage(newPage + 1)}
              onRowsPerPageChange={({ target }) =>
                onChangePerPage(Number(target.value))
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
