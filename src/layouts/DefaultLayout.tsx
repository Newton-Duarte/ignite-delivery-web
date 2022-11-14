import { Snackbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useSnackbar } from '../contexts/snackbar'

export function DefaultLayout() {
  const { isSnackbarOpen, closeSnackbar, snackbarMessage } = useSnackbar()

  return (
    <div>
      <Header />
      <Outlet />
      <Snackbar
        open={isSnackbarOpen}
        onClose={closeSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        message={snackbarMessage}
      />
    </div>
  )
}
