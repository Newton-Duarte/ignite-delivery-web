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
  TableSortLabel,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Delivery } from '../contexts/UserDeliveriesContext'

interface DeliveriesListProps {
  deliveries: Delivery[]
  total: number
  page: number
  perPage: number
  sortBy: string
  sort: 'desc' | 'asc'
  onChangePage: (newPage: number) => void
  onChangePerPage: (newPerPage: number) => void
  onMakeDelivery: (delivery: Delivery) => void
  onSort: (sort: string) => void
}

export default function DeliveriesList({
  deliveries,
  total,
  page,
  perPage,
  sortBy,
  sort,
  onChangePage,
  onChangePerPage,
  onMakeDelivery,
  onSort,
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
            <TableCell sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortBy === 'client'}
                direction={sortBy === 'client' ? sort : 'asc'}
                onClick={() => onSort('client')}
              >
                Solicitante
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortBy === 'item_name'}
                direction={sortBy === 'item_name' ? sort : 'asc'}
                onClick={() => onSort('item_name')}
              >
                Encomenda
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
              Endereço
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
              <TableSortLabel
                active={sortBy === 'created_at'}
                direction={sortBy === 'created_at' ? sort : 'asc'}
                onClick={() => onSort('created_at')}
              >
                Criado em
              </TableSortLabel>
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
                  <Button
                    variant="contained"
                    onClick={() => onMakeDelivery(delivery)}
                  >
                    Realizar Entrega
                  </Button>
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
