import Navbar from './components/Navbar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup'

function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false)

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
    </>
  )
}

export default App