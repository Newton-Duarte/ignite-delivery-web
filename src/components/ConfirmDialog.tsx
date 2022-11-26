import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import ArrowDownIcon from '@mui/icons-material/South'
import { Delivery } from '../contexts/UserDeliveriesContext'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  delivery: Delivery | undefined
  loading: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  delivery,
  onConfirm,
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      disableEscapeKeyDown={loading}
    >
      <Box>
        <DialogTitle
          id="dialog-title"
          sx={{
            fontSize: {
              xs: 16,
              sm: 20,
            },
          }}
        >
          Deseja entregar essa encomenda?
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="action" sx={{ fontWeight: 'bold' }}>
              {delivery?.item_name}
            </Typography>
            <ArrowDownIcon color="action" sx={{ my: 2 }} />
            <Typography variant="body2">
              {delivery?.client?.name} - {delivery?.address}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center' }}>
          <Button variant="text" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
