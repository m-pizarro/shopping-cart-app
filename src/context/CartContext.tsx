import React, { Dispatch, ReactNode, createContext, useReducer } from 'react'
import { CartAction, cartReducer, initialState } from 'reducers/cartReducer'
import { CartState } from 'common/types'

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext<{
  state: CartState
  dispatch: Dispatch<CartAction>
}>({
  state: initialState,
  dispatch: () => undefined,
})

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
