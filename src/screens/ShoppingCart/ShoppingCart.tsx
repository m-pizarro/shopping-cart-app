import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Alert,
  Badge,
  BadgeProps,
  Box,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  styled,
} from '@mui/material'

import { shoppingCart } from 'common/locales/es'
import { CartStatus } from 'common/types'
import PageContainer from 'components/PageContainer'
import PageTitle from 'components/PageTitle'
import { useCart } from 'hooks/useCart'
import { useEffect, useState } from 'react'
import { getCarts, newCart } from 'services/api'
import Cart from './components/Cart'
import ProductList from './components/ProductList'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

export const ShoppingCart = () => {
  const { state, dispatch } = useCart()
  const { status } = state.cart
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const pendingCart = await getCarts(CartStatus.PENDING)
      if (pendingCart.data?.length > 0) {
        dispatch({ type: 'SET_CART', payload: pendingCart.data[0] })
      } else {
        const response = await newCart()
        dispatch({ type: 'SET_CART', payload: response.data })
      }
    }

    fetchData()
  }, [status, dispatch])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleConfirCart = () => {
    setOpen(false)
    setShowAlert(true)
  }

  const totalProducts = state.cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  )

  return (
    <PageContainer>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <PageTitle sx={{ fontFamily: 'cursive' }}>
          {shoppingCart.home.title}
        </PageTitle>
        <Box>
          <IconButton
            aria-label="cart"
            onClick={toggleDrawer(true)}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <StyledBadge badgeContent={totalProducts} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ width: '100%' }} />
      <Box sx={{ pt: 2 }}>
        <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 350 }} role="presentation">
            <Cart onConfirmCart={handleConfirCart} />
          </Box>
        </Drawer>
      </Box>
      <ProductList />
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ position: 'absolute' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {shoppingCart.messages.confirmSuccess}
        </Alert>
      </Snackbar>
    </PageContainer>
  )
}
