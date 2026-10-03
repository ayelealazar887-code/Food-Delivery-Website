import React, { useEffect, useState, type ReactNode } from 'react'
import {
  StoreContext,
  type StoreContextType,
  type Food,
} from './StoreContext'
import { apii } from '../api/axios'

type Props = {
  children: ReactNode
}

type Food = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

function StoreContextProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({})
  const [token, setToken] = useState<string>('')
  const [food_list, setFoodList] = useState<Food[]>([])

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

    for (const item in cartItems) {
      const itemDetails = food_list.find((food) => food.id === item)

      if (itemDetails) {
        totalAmount += itemDetails.price * cartItems[item]
      }
    }

    return totalAmount
  }

  const fetchFoodList = async () => {
    try {
      const response = await apii.get('/list')

      if (response.data.success) {
        setFoodList(response.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList()

      const savedToken = localStorage.getItem('token')

      if (savedToken) {
        setToken(savedToken)
      }
    }

    loadData()
  }, [])

  const contextValue: StoreContextType = {
    food_list,
    setFoodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider