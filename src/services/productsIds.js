// API - Services
import { API } from "./api.js"
export async function productsIds(){
  try {
    const response = await fetch(API.PRODUCTS)
    if(!response.ok) throw new Error('Solicitud fallida.')
    const productsData = await response.json()
    const ids = productsData["products"].map(product=> product["id"])
    return ids
  } catch (error) {
    console.error("Couldn't get products data due to: ", error)
    return []
  }
}