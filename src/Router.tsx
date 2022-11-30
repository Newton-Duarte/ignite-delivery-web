import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import { Loading } from './components/Loading'
import { useAuth } from './contexts/AuthContext'
import { DefaultLayout } from './layouts/DefaultLayout'
import { About } from './pages/About'
import Home from './pages/HomeContainer'
import Login from './pages/Login'
import Profile from './pages/ProfileContainer'
import SignUp from './pages/SignUp'
import { PrivateRoutes } from './PrivateRoutes'

export function Router() {
  const { user } = useAuth()

  if (user === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Loading />
      </Box>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/user/profile" element={<Profile />}></Route>
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}
