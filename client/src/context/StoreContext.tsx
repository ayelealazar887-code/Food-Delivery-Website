import { createContext, type ReactNode } from 'react'
import { food_list } from '../assets/assets'

type StoreContextType = {
  food_list: typeof food_list
}

export const StoreContext = createContext<StoreContextType | null>(null)

type StoreContextProviderProps = {
  children: ReactNode
}

function StoreContextProvider({ children }: StoreContextProviderProps) {
  const contextValue: StoreContextType = {
    food_list,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider