import { useEffect, useState } from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
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

  useEffect(() => {
    if (loading) return

    fetchDeliveries({ page, perPage })
  }, [page, perPage])

  function handleChangePage(newPage: number) {
    setSearchParams({
      per_page: String(perPage),
      page: String(newPage + 1),
    })
  }

  function handleChangePerPage(newPerPage: number) {
    setSearchParams({ page: '1', per_page: String(newPerPage) })
  }

  function handleMakeDelivery(delivery: Delivery) {
    setToDelivery(delivery)
    setIsConfirmDialogOpen(true)
  }

  function handleConfirmTakeDelivery() {
    updateDelivery(toDelivery?.id as string, () => {
      setToDelivery(undefined)
      setIsConfirmDialogOpen(false)
      fetchDeliveries({ page, perPage })
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
        {isClient && (
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Nova Entrega
          </Button>
        )}
      </Box>
      {!deliveries?.total || loading ? (
        <ListLoading />
      ) : deliveries?.total ? (
        <DeliveriesList
          deliveries={deliveries.data}
          total={deliveries.total}
          page={page - 1}
          perPage={perPage}
          onChangePage={handleChangePage}
          onChangePerPage={handleChangePerPage}
          onMakeDelivery={handleMakeDelivery}
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
