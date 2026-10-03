import { createContext } from 'react'

export type Food = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type StoreContextType = {
  food_list: Food[]
  setFoodList: React.Dispatch<React.SetStateAction<Food[]>>

  cartItems: { [key: string]: number }
  addToCart: (itemId: string) => void
  removeFromCart: (itemId: string) => void
  getTotalCartAmount: () => number

  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const StoreContext = createContext<StoreContextType | null>(null)