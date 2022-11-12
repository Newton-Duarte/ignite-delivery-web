import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from '@mui/material'

export default function ListLoading() {
  return (
    <Table aria-label="available-deliveries-table" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(10).keys()].map((n) => (
          <TableRow key={n}>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
