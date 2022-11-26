import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Delivery } from '../contexts/UserDeliveriesContext'

interface DeliveriesListProps {
  deliveries: Delivery[]
  total: number
  page: number
  perPage: number
  onChangePage: (newPage: number) => void
  onChangePerPage: (newPerPage: number) => void
}

export default function DeliveriesList({
  deliveries,
  total,
  page,
  perPage,
  onChangePage,
  onChangePerPage,
}: DeliveriesListProps) {
  const { isDeliveryman } = useAuth()

  return (
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
          {deliveries?.map((delivery) => (
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={total}
              rowsPerPage={perPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
              }}
              onPageChange={(_, newPage) => onChangePage(newPage)}
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
