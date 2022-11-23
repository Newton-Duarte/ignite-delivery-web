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
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useDeliveries } from '../contexts/DeliveriesContext'

const createDeliveryFormValidationSchema = zod.object({
  item_name: zod.string().min(2, 'Informe a encomenda'),
  address: zod.string().min(5, 'Informe o endereço'),
})

type CreateDeliveryFormData = zod.infer<
  typeof createDeliveryFormValidationSchema
>

interface CreateDeliveryProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateDelivery({
  isOpen,
  onClose,
}: CreateDeliveryProps) {
  const { register, handleSubmit, reset } = useForm<CreateDeliveryFormData>({
    resolver: zodResolver(createDeliveryFormValidationSchema),
    defaultValues: {
      item_name: '',
      address: '',
    },
  })

  const { createDelivery, loadingCreateDelivery } = useDeliveries()

  function onSave(data: CreateDeliveryFormData) {
    createDelivery(data, () => {
      reset()
      onClose()
    })
  }

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
                autoFocus
                disabled={loadingCreateDelivery}
              />
            </FormControl>
            <FormControl component={Grid} item fullWidth>
              <TextField
                {...register('address')}
                id="address"
                type="text"
                label="Endereço"
                disabled={loadingCreateDelivery}
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="text"
            onClick={onClose}
            disabled={loadingCreateDelivery}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loadingCreateDelivery}
          >
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
