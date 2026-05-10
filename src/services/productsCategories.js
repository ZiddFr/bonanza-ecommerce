// Services
import { API } from "./api.js"
export async function productsCategories(){
  try {
    const response = await fetch(API.PRODUCTS_CATEGORY_LIST)
    if(!response.ok) throw new Error("Solicitud denegada")
    const data = await response.json()
    return data  
  } catch (error) {
    console.error("Solicitud denegada")
    return []
  }
}