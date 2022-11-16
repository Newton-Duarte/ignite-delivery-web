import { createContext, ReactNode, useContext, useState } from 'react'

interface SnackbarContextData {
  showSnackbarMessage(message: string): void
  closeSnackbar(): void
  isSnackbarOpen: boolean
  snackbarMessage: string
}

const SnackbarContext = createContext({} as SnackbarContextData)

export function useSnackbar(): SnackbarContextData {
  const context = useContext(SnackbarContext)

  return context
}

interface SnackbarProviderProps {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  function showSnackbarMessage(message: string) {
    setSnackbarMessage(message)
    setIsSnackbarOpen(true)
  }

  function closeSnackbar() {
    setIsSnackbarOpen(false)
  }

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbarMessage,
        closeSnackbar,
        isSnackbarOpen,
        snackbarMessage,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}
