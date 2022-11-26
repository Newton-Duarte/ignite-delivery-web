import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  TableContainer,
  Paper,
} from '@mui/material'

interface ListLoadingProps {
  rows?: number
}

export default function ListLoading({ rows = 10 }: ListLoadingProps) {
  return (
    <TableContainer component={Paper}>
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
          {[...Array(rows).keys()].map((n) => (
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
    </TableContainer>
  )
}
