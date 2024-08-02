import axios from 'axios'
import { API_HOST } from 'common/configurations'
import { CartStatus } from 'common/types'

const api = axios.create({
  baseURL: API_HOST,
})

export const getProducts = () => api.get('/products')
export const getCarts = (status: CartStatus) =>
  api.get(`/carts`, {
    params: { status },
  })
export const newCart = () => api.post(`/carts`)
export const addToCart = (productId: string) =>
  api.post(`/carts`, {
    products: [
      {
        productId: productId,
        quantity: 1,
      },
    ],
    status: 'pending',
  })
export const updateCart = (
  cartId: string,
  productId: string,
  quantity: number
) => api.patch(`/carts/${cartId}/products/${productId}`, { quantity })
export const removeFromCart = (cartId: string, productId: string) =>
  api.delete(`/carts/${cartId}/products/${productId}`)
export const confirmCart = (cartId: string) =>
  api.patch(`/carts/${cartId}/confirm`)

export default api
