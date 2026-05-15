// API
import { API } from "./api.js"
//  USER_CART: "https://dummyjson.com/carts/user",
export async function userCart(userId){
  try {
    const accessToken = document.cookie.split('; ').find(row=>row.startsWith('access_token='))?.split("=")[1]
    const cartAPI = API.USER_CART + userId
    const response = await fetch(cartAPI, {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok) throw new Error('Solicitud fallida')
    const userCartInfo = await response.json()
    return userCartInfo // returns -> {...}
  } catch (error) {
    console.error("Couldn't get cart data due to: ", error)
    return {}
  }
}