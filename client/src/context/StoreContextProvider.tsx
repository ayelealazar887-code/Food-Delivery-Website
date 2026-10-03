import React, { useEffect, useState, type ReactNode } from 'react'
import { food_list } from '../assets/assets'
import { StoreContext, type StoreContextType } from './StoreContext'

type Props = {
  children: ReactNode
}

function StoreContextProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({})
  const [token, setToken] = useState<string>('');

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }
  const getTotalCartAmount = () => {
    let totalAmount = 0
    for(const item in cartItems) {
      const itemDetails = food_list.find((food) => food._id === item)
      if (itemDetails) {
        totalAmount += itemDetails.price * cartItems[item]
      }
    }
    return totalAmount
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  },[])
  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider