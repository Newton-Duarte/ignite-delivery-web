import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface LoginFormProps {
  onSubmit: (data: any) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useForm()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiTextField-root': { mb: 3 },
      }}
    >
      <FormControl fullWidth>
        <TextField
          {...register('username')}
          id="username"
          type="text"
          label="Usuário"
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
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          Criar uma conta
        </Button>
      </FormControl>
    </Box>
  )
}
