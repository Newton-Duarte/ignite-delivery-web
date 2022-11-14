import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Paper,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Container,
  Box,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useSnackbar } from '../contexts/snackbar'

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false)

  const { showSnackbarMessage } = useSnackbar()

  const { register, handleSubmit } = useForm()

  const handleUpdateProfile = (data: any) => {
    console.log(data)
    showSnackbarMessage('Sucesso!')
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: {
            xs: '100%',
            sm: 400,
          },
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
          Perfil
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleUpdateProfile)}
          sx={{
            '& .MuiTextField-root, & .MuiFormGroup-root': { mb: 3 },
          }}
        >
          <FormControl fullWidth>
            <TextField
              {...register('name')}
              id="name"
              type="text"
              label="Nome"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              {...register('email')}
              id="email"
              type="email"
              label="E-mail"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Button type="submit" variant="contained" size="large">
              Salvar
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  )
}
