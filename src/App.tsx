import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { ptBR } from '@mui/material/locale'
import { SnackbarProvider } from './contexts/snackbar'
import { Router } from './Router'
import { AuthProvider } from './contexts/AuthContext'

const theme = createTheme({}, ptBR)

export function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  )
}
