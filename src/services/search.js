// API - Services
import { API } from './api.js'
export async function search(value){
  try {
    const searchURL = API.SEARCH_PRODUCT + value + "&limit=5"
    const response = await fetch(searchURL)
    if(!response.ok) throw new Error("Solicitud fallida.")
    const productsData = await response.json()
  return productsData.products
  } catch (error) {
    console.error("Couldn't search for products data due to: ",error)
    return []
  }
}