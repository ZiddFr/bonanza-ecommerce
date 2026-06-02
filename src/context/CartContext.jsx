// Function
import { createContext } from 'react'
// Custom hook
import { useUserCart } from '../hooks/useUserCart.js'

export const CartStatus = createContext(null)
export function CartContext({children}){
  const {userCartIds,setUserCartIds} = useUserCart()
  return(
    <CartStatus.Provider value={{userCartIds,setUserCartIds}}>
      {children}
    </CartStatus.Provider>
  )
}