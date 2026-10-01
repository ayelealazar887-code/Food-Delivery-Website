import { createContext } from 'react'
import { food_list } from '../assets/assets'

export type StoreContextType = {
  food_list: typeof food_list
  cartItems: { [key: string]: number }
  addToCart: (itemId: string) => void
  removeFromCart: (itemId: string) => void
  getTotalCartAmount: () => number
}

export const StoreContext = createContext<StoreContextType | null>(null)