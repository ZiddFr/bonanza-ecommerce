// API
import { API } from "./api"
export async function userCart(userId){
  try {
    const cartAPI = API.USER_CART + `/${userId}`
    const response = await fetch(cartAPI)
    if(!response.ok) throw new Error('Solicitud fallida')
    const userCartInfo = await response.json()
    return userCartInfo // returns -> {...}
  } catch (error) {
    console.error("Couldn't get cart data due to: ", error)
    return []
  }
}