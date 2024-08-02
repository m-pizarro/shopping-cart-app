import { Grid } from '@mui/material'
import { CartContext } from 'context/CartContext'
import { useContext, useEffect } from 'react'
import { getProducts, updateCart } from 'services/api'
import ProductComponent from './Product'

const ProductList = () => {
  const { state, dispatch } = useContext(CartContext)
  const { id: cartId, products } = state.cart

  useEffect(() => {
    getProducts().then((response) => {
      dispatch({ type: 'SET_PRODUCTS', payload: response.data })
    })
  }, [dispatch])

  const handleAddToCart = async (productId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: productId })
    const product = products.find((product) => product.product.id === productId)
    const newQuantity = product && product.quantity ? product.quantity + 1 : 1
    await updateCart(cartId, productId, newQuantity)
  }

  return (
    <Grid container direction="row" spacing={3} sx={{ minWidth: '600px' }}>
      {state.products.map((product) => (
        <Grid item xs={6} md={4} lg={3} key={`product-${product.id}`}>
          <ProductComponent
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
