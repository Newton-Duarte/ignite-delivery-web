import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from './contexts/snackbar'
import { Router } from './Router'
import { AuthProvider } from './contexts/AuthContext'

const theme = createTheme()

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
