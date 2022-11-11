import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit } = useForm()

  const handleLogin = (data: any) => {
    console.log(data)
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
          Ignite Deliveries - Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          sx={{
            '& .MuiTextField-root': { mb: 3 },
          }}
        >
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
              Entrar
            </Button>
            <Divider sx={{ my: 3 }} />
            <Button component={NavLink} to="/sign-up" size="large">
              Fazer cadastro
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  )
}
