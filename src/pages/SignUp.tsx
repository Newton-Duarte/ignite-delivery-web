import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import deliverymanSvg from '../assets/undraw_delivery_truck.svg'
import customerSvg from '../assets/undraw_delivery.svg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAuth } from '../contexts/AuthContext'

const signUpFormValidationSchema = zod.object({
  name: zod.string().min(2, 'Informe o nome'),
  address: zod.string().optional(),
  username: zod.string().min(2, 'Informe o usuário'),
  password: zod.string().min(6, 'Informe a senha (Mínimo de 6 caracteres)'),
})

type SignUpFormData = zod.infer<typeof signUpFormValidationSchema>

export default function SignUp() {
  const [loginType, setLoginType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { loading, signUp } = useAuth()

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      name: '',
      address: '',
      username: '',
      password: '',
    },
  })

  const { errors } = formState

  const handleCreateUser = (data: SignUpFormData) => {
    signUp(loginType, data.name, data.username, data.password, data.address)
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loginType ? (
        <Paper
          sx={{
            width: {
              xs: '100%',
              sm: 400,
            },
            p: 3,
          }}
        >
          <Stack
            direction="row"
            mb={4}
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'relative',
            }}
          >
            <IconButton
              onClick={() => setLoginType('')}
              sx={{
                position: 'absolute',
                left: 0,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">
              Cadastro {loginType === 'customer' ? 'Cliente' : 'Entregador'}
            </Typography>
          </Stack>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleCreateUser)}
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
                error={!!errors.name}
                helperText={errors?.name?.message as string}
              />
            </FormControl>
            {loginType === 'customer' && (
              <FormControl fullWidth>
                <TextField
                  {...register('address')}
                  id="address"
                  type="text"
                  label="Endereço"
                  error={!!errors.address}
                  helperText={errors?.address?.message as string}
                />
              </FormControl>
            )}
            <FormControl fullWidth>
              <TextField
                {...register('username')}
                id="username"
                type="text"
                label="Usuário"
                error={!!errors.username}
                helperText={errors?.username?.message as string}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                error={!!errors.password}
                helperText={errors?.password?.message as string}
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
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                Salvar
              </Button>
              <Divider sx={{ my: 3 }} />
              <Button
                component={NavLink}
                to="/login"
                size="large"
                startIcon={<ChevronLeftIcon />}
                disabled={loading}
              >
                Voltar para o login
              </Button>
            </FormControl>
          </Box>
        </Paper>
      ) : (
        <>
          <Stack
            direction={{
              sx: 'column',
              md: 'row',
            }}
            spacing={2}
          >
            <Paper
              sx={{
                width: {
                  xs: '100%',
                  md: 400,
                },
                p: 3,
                mb: {
                  xs: 2,
                  md: 0,
                },
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 8,
                },
              }}
              onClick={() => setLoginType('customer')}
            >
              <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
                Cadastro Cliente
              </Typography>
              <img src={customerSvg} alt="" style={{ maxWidth: '100%' }} />
            </Paper>
            <Paper
              sx={{
                width: {
                  xs: '100%',
                  md: 400,
                },
                p: 3,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 8,
                },
              }}
              onClick={() => setLoginType('deliveryman')}
            >
              <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
                Cadastro Entregador
              </Typography>
              <img src={deliverymanSvg} alt="" style={{ maxWidth: '100%' }} />
            </Paper>
          </Stack>
          <Button
            component={NavLink}
            to="/login"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 5 }}
          >
            Voltar para o login
          </Button>
        </>
      )}
    </Container>
  )
}
