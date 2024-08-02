export enum CartStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  image: string
}

export interface ProductCart {
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  status: CartStatus
  products: ProductCart[]
}

export interface CartState {
  products: Product[]
  cart: Cart
}
