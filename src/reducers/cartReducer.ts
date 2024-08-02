import { Cart, CartState, CartStatus, Product, ProductCart } from 'common/types'
import { getRandomProductImage } from 'common/utils'

export const initialState: CartState = {
  products: [],
  cart: {
    id: '',
    status: CartStatus.PENDING,
    products: [],
  },
}

export type CartAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: string }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART'; payload: { productId: string; quantity: number } }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'CONFIRM_CART'; payload: string }

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      const products = action.payload.map((product, index) => ({
        ...product,
        image: getRandomProductImage(index, product.id),
      }))
      return { ...state, products }
    }
    case 'ADD_TO_CART': {
      const existingProduct = state.cart.products.find(
        (product) => product.product.id === action.payload
      )
      if (existingProduct) {
        return {
          ...state,
          cart: {
            ...state.cart,
            products: state.cart.products.map((product) =>
              product.product.id === action.payload
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          },
        }
      } else {
        const productToAdd = state.products.find(
          (product) => product.id === action.payload
        )
        return {
          ...state,
          cart: {
            ...state.cart,
            products: [
              ...(state.cart.products as ProductCart[]),
              {
                productId: action.payload,
                quantity: 1,
                product: productToAdd!,
              },
            ],
          },
        }
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            (product) => product.product.id !== action.payload
          ),
        },
      }
    case 'UPDATE_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map((product) =>
            product.product.id === action.payload.productId
              ? {
                  ...product,
                  quantity: action.payload.quantity,
                }
              : product
          ),
        },
      }
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'CONFIRM_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          status: CartStatus.COMPLETED,
        },
      }
    default:
      return state
  }
}
