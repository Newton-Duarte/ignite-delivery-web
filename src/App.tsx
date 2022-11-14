import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from './contexts/snackbar'
import { Router } from './Router'

const theme = createTheme()

export function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  )
}
