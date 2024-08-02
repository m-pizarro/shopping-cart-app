import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { shoppingCart } from 'common/locales/es'
import { ProductCart } from 'common/types'

interface Props {
  productCart: ProductCart
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveProduct: (productId: string) => void
}

const Cart = ({ productCart, onUpdateQuantity, onRemoveProduct }: Props) => {
  const { product, quantity } = productCart
  return (
    <Grid
      item
      container
      key={product.id}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <img src={product.image} alt={product.name} height={70} />
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle1">{product.name}</Typography>
          <TextField
            size="small"
            type="number"
            inputProps={{ min: '1' }}
            value={quantity}
            onChange={(e) =>
              onUpdateQuantity(product.id, parseInt(e.target.value, 10))
            }
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Tooltip title={shoppingCart.cart.removeProduct}>
          <IconButton
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            onClick={() => onRemoveProduct(product.id)}
          >
            <RemoveShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default Cart
