import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function Login() {
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
          sx={{
            '& .MuiTextField-root': { mb: 3 },
          }}
        >
          <FormControl fullWidth>
            <TextField id="email" type="email" label="E-mail" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="password" type="password" label="Senha" />
          </FormControl>
          <FormControl fullWidth>
            <Button variant="contained" size="large">
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
