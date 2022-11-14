import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={NavLink}
            noWrap
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: { xs: 'none', md: 'flex' },
              mr: 2,
              fontWeight: 700,
            }}
          >
            Ignite Deliveries
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ignite Deliveries
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Meu perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Newton Duarte" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', '.MuiMenu-list': { py: 0 } }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={NavLink}
                to="/user/profile"
                onClick={handleCloseUserMenu}
                sx={{ py: 1.5 }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/user/deliveries"
                onClick={handleCloseUserMenu}
                sx={{ py: 1.5 }}
              >
                <Typography textAlign="center">Minhas Entregas</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
