import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ShoppingCart } from './screens/ShoppingCart'

const App = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
      </Routes>
    </Router>
  </CartProvider>
)

export default App
