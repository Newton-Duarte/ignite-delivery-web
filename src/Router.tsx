import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { About } from './pages/About'
import Home from './pages/HomeContainer'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/user/profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  )
}
