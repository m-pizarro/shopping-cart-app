import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { shoppingCart } from 'common/locales/es'
import { Product } from 'common/types'

interface Props {
  product: Product
  onAddToCart: (productId: string) => void
}

const ProductComponent = ({ product, onAddToCart }: Props) => {
  return (
    <Card sx={{ minWidth: '220px', maWidth: '220px', p: 2 }}>
      <CardMedia sx={{ height: 140 }} image={product.image} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="subtitle2">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product.id)}
          >
            {shoppingCart.products.addProduct}
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ProductComponent
