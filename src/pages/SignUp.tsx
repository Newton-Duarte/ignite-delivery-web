import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit } = useForm()

  const handleCreateUser = (data: any) => {
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
          Ignite Deliveries - Cadastro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleCreateUser)}
          sx={{
            '& .MuiTextField-root, & .MuiFormGroup-root': { mb: 3 },
          }}
        >
          <FormControl fullWidth sx={{ alignItems: 'center' }}>
            <RadioGroup name="user-type" aria-labelledby="user-type" row>
              <FormControlLabel
                {...register('client')}
                control={<Radio />}
                label="Cliente"
                value="client"
              />
              <FormControlLabel
                control={<Radio />}
                label="Entregador"
                value="deliveryman"
              />
            </RadioGroup>
          </FormControl>
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
            <Divider sx={{ my: 3 }} />
            <Button
              component={NavLink}
              to="/login"
              size="large"
              startIcon={<ChevronLeftIcon />}
            >
              Voltar para o login
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  )
}
