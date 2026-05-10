// Services
import { API } from "./api.js"

export async function productsByCategory(category){
  try {
    const CATEGORY_API = API.PRODUCTS_BY_CATEGORY + category
    const response = await fetch(CATEGORY_API)
    if(!response.ok) throw new Error("Solicitud denegada")
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error("Solicitud denegada")
    return []
  }
}