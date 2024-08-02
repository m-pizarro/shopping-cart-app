import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { Box, Button, Divider, Typography } from '@mui/material'
import { shoppingCart } from 'common/locales/es'
import { ProductCart } from 'common/types'
import { useCart } from 'hooks/useCart'
import { confirmCart, removeFromCart, updateCart } from 'services/api'
import CartItem from './CartItem'

interface Props {
  onConfirmCart: () => void
}

const Cart = ({ onConfirmCart }: Props) => {
  const { state, dispatch } = useCart()
  const { id: cartId, products = [] } = state.cart
  const hasProducts = products.length > 0

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateCart(cartId, productId, quantity)
    dispatch({ type: 'UPDATE_CART', payload: { productId, quantity } })
  }

  const handleRemoveProduct = async (productId: string) => {
    await removeFromCart(cartId, productId)
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const handleConfirmCart = async (cartId: string) => {
    await confirmCart(cartId)
    dispatch({ type: 'CONFIRM_CART', payload: cartId })
    onConfirmCart()
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontFamily: 'cursive' }}>
        {shoppingCart.cart.title}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      {!hasProducts ? (
        <Typography variant="subtitle2" textTransform="uppercase">
          {shoppingCart.cart.emptyCart}
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} key={cartId}>
          {products.map((product: ProductCart) => (
            <>
              <CartItem
                productCart={product}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveProduct={handleRemoveProduct}
              />
              <Divider sx={{ width: '100%' }} />
            </>
          ))}
        </Box>
      )}
      {hasProducts && (
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleConfirmCart(state.cart.id)}
            disabled={!hasProducts}
            startIcon={<ShoppingCartCheckoutIcon />}
          >
            {shoppingCart.cart.confirm}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Cart
