import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import deliverymanSvg from '../assets/undraw_delivery_truck.svg'
import customerSvg from '../assets/undraw_delivery.svg'
import LoginForm from '../components/LoginForm'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Login() {
  const [loginType, setLoginType] = useState('')
  const { signIn } = useAuth()

  const handleLogin = (data: any) => {
    signIn(loginType, data.username, data.password)
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
              md: 400,
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
              Login {loginType === 'customer' ? 'Cliente' : 'Entregador'}
            </Typography>
          </Stack>
          <LoginForm onSubmit={handleLogin} />
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
                Login Cliente
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
                Login Entregador
              </Typography>
              <img src={deliverymanSvg} alt="" style={{ maxWidth: '100%' }} />
            </Paper>
          </Stack>
          <Button component={NavLink} to="/sign-up" size="large" sx={{ mt: 5 }}>
            Criar uma conta
          </Button>
        </>
      )}
    </Container>
  )
}
