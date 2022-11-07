import {
  Box,
  Container,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

export default function Login() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ width: 300 }}>
        <Typography variant="h6">Login</Typography>
        <Box component="form">
          <FormGroup>
            <TextField id="email" type="email" label="E-mail" />
          </FormGroup>
          <FormGroup>
            <TextField id="password" type="password" label="Senha" />
          </FormGroup>
        </Box>
      </Paper>
    </Container>
  )
}
