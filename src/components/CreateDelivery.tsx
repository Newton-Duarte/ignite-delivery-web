import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
  Grid,
  Box,
} from '@mui/material'

interface CreateDeliveryProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export default function CreateDelivery({
  isOpen,
  onClose,
  onSave,
}: CreateDeliveryProps) {
  const { register, handleSubmit } = useForm()

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Box component="form" onSubmit={handleSubmit(onSave)}>
        <DialogTitle id="dialog-title">Nova Entrega</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ my: 0 }}>
            <FormControl component={Grid} item fullWidth>
              <TextField
                {...register('item_name')}
                id="item_name"
                type="text"
                label="Encomenda"
              />
            </FormControl>
            <FormControl component={Grid} item fullWidth>
              <TextField
                {...register('address')}
                id="address"
                type="text"
                label="Endereço"
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="text" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" onClick={onSave} autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
