import React, { useEffect, useRef, useState } from 'react'
import {
  Paper,
  Typography,
  Container,
  Avatar,
  Divider,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import SearchIcon from '@mui/icons-material/Search'
import UserDeliveriesList from '../components/UserDeliveriesList'
import { useAuth } from '../contexts/AuthContext'
import { useUserDeliveries } from '../contexts/UserDeliveriesContext'
import ListLoading from '../components/ListLoading'
import noDataSvg from '../assets/undraw_no_data.svg'

export function Profile() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const { fetchUserDeliveries, deliveries, loading, confirmDelivery } =
    useUserDeliveries()
  const { user, isClient, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    fetchUserDeliveries({ page, perPage, search })
  }, [isAuthenticated, page, perPage, search])

  function handleConfirmDelivery(deliveryId: string) {
    confirmDelivery(deliveryId, () =>
      fetchUserDeliveries({ page, perPage, search }),
    )
  }

  const searchInput = useRef<TextFieldProps>()

  const loginTypeColor = grey[500]

  function handleSearchKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return

    handleChangeSearch()
  }

  function handleChangeSearch() {
    setSearch(searchInput?.current?.value as string)
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        my: 5,
      }}
    >
      <Paper
        sx={{
          width: {
            xs: '100%',
            sm: 600,
          },
          p: 3,
        }}
      >
        <Avatar
          alt={user?.name}
          sx={{
            width: 128,
            height: 128,
            fontSize: '2.125rem',
            margin: '0 auto',
          }}
        >
          {user?.name.split(' ')[0][0]}
          {user?.name.split(' ')[1][0]}
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
          {user?.name}
        </Typography>
        <Typography
          variant="body2"
          color={loginTypeColor}
          sx={{ mb: 4, textAlign: 'center' }}
        >
          {isClient ? 'Cliente' : 'Entregador'}
        </Typography>
        <Divider />
        <Box>
          <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
            {user?.deliveries?.length || 0}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Entregas
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          width: {
            xs: '100%',
            sm: 900,
          },
          mt: 3,
        }}
      >
        <Box
          sx={{
            mb: 3,
            px: 2,
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Minhas {isClient ? 'encomendas' : 'entregas'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              variant="standard"
              label="Pesquisar"
              inputRef={searchInput}
              onKeyUp={handleSearchKeyUp}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search submit"
                      onClick={handleChangeSearch}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        {!deliveries?.total || loading ? (
          <ListLoading rows={5} />
        ) : deliveries?.total ? (
          <UserDeliveriesList
            deliveries={deliveries.data}
            total={deliveries.total}
            page={page}
            perPage={perPage}
            onChangePage={(newPage) => setPage(newPage)}
            onChangePerPage={(newPerPage) => setPerPage(newPerPage)}
            onConfirmDelivery={handleConfirmDelivery}
          />
        ) : (
          <Paper
            sx={{
              width: {
                xs: '100%',
                sm: 400,
              },
              p: 5,
              margin: '0 auto',
            }}
          >
            <img
              src={noDataSvg}
              alt="empty data"
              style={{ maxWidth: '100%' }}
            />
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Nenhuma entrega encontrada
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  )
}
