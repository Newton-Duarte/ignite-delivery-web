import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { NavLink } from 'react-router-dom'

export default function SignUp() {
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
          sx={{
            '& .MuiTextField-root, & .MuiFormGroup-root': { mb: 3 },
          }}
        >
          <FormControl fullWidth sx={{ alignItems: 'center' }}>
            <RadioGroup name="user-type" aria-labelledby="user-type" row>
              <FormControlLabel
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
            <TextField id="name" type="text" label="Nome" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="email" type="email" label="E-mail" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="password" type="password" label="Senha" />
          </FormControl>
          <FormControl fullWidth>
            <Button variant="contained" size="large">
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
