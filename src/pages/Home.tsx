import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CreateDelivery from '../components/CreateDelivery'
import DeliveriesList from '../components/DeliveriesList'
import ListLoading from '../components/ListLoading'
import { useAuth } from '../contexts/AuthContext'
import { useDeliveries } from '../contexts/DeliveriesContext'
import noDataSvg from '../assets/undraw_no_data.svg'
import { useSearchParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { Delivery } from '../contexts/UserDeliveriesContext'

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [toDelivery, setToDelivery] = useState<Delivery | undefined>()

  const searchInput = useRef<TextFieldProps>()

  const {
    fetchDeliveries,
    deliveries,
    loading,
    updateDelivery,
    loadingCreateDelivery,
  } = useDeliveries()

  const { isClient } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const perPage = Number(searchParams.get('per_page')) || 5
  const sort = searchParams.get('sort')
    ? (String(searchParams.get('sort')) as 'asc' | 'desc')
    : ('desc' as 'asc' | 'desc')
  const sortBy = searchParams.get('sort_by')
    ? String(searchParams.get('sort_by'))
    : 'created_at'
  const search = searchParams.get('search')
    ? String(searchParams.get('search'))
    : ''

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.value = search
    }
  }, [])

  useEffect(() => {
    if (loading) return

    fetchDeliveries({ page, perPage, search, sortBy, sort })
  }, [page, perPage, search, sortBy, sort])

  function handleChangePage(newPage: number) {
    setSearchParams({
      per_page: String(perPage),
      page: String(newPage + 1),
      sort_by: sortBy,
      sort,
      search,
    })
  }

  function handleChangePerPage(newPerPage: number) {
    setSearchParams({
      page: '1',
      per_page: String(newPerPage),
      sort_by: sortBy,
      sort,
      search,
    })
  }

  function handleMakeDelivery(delivery: Delivery) {
    setToDelivery(delivery)
    setIsConfirmDialogOpen(true)
  }

  function handleConfirmTakeDelivery() {
    updateDelivery(toDelivery?.id as string, () => {
      setToDelivery(undefined)
      setIsConfirmDialogOpen(false)
      fetchDeliveries({ page, perPage, search, sortBy, sort })
    })
  }

  function handleSearchKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return

    handleChangeSearch()
  }

  function handleChangeSearch() {
    setSearchParams({
      page: '1',
      per_page: String(perPage),
      search: searchInput?.current?.value as string,
      sort_by: sortBy,
      sort,
    })
  }

  function handleSort(newSort: string) {
    setSearchParams({
      page: String(page),
      per_page: String(perPage),
      sort_by: newSort,
      sort: newSort === sortBy ? (sort === 'desc' ? 'asc' : 'desc') : 'desc',
      search: searchInput?.current?.value as string,
    })
  }

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Entregas disponíveis
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
          {isClient && (
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              sx={{ ml: 3 }}
            >
              Nova Entrega
            </Button>
          )}
        </Box>
      </Box>
      {!deliveries?.total && loading ? (
        <ListLoading />
      ) : deliveries?.total ? (
        <DeliveriesList
          deliveries={deliveries.data}
          total={deliveries.total}
          page={page - 1}
          perPage={perPage}
          sortBy={sortBy}
          sort={sort}
          onChangePage={handleChangePage}
          onChangePerPage={handleChangePerPage}
          onMakeDelivery={handleMakeDelivery}
          onSort={handleSort}
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
          <img src={noDataSvg} alt="empty data" style={{ maxWidth: '100%' }} />
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Nenhuma entrega encontrada
          </Typography>
        </Paper>
      )}
      <CreateDelivery
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false)
          setToDelivery(undefined)
        }}
        delivery={toDelivery}
        onConfirm={handleConfirmTakeDelivery}
        loading={loadingCreateDelivery}
      />
    </Container>
  )
}
