// Services
import { API } from "./api"

export async function productPage(productId){
  try {
    const getProduct = API.SINGLE_PRODUCT + `/${productId}`
    const response = await fetch(getProduct)
    if(!response.ok) throw new Error('Solicitud fallida')
    const productData = await response.json()
    return productData
  } catch (error) {
    console.error("Couldn't get product data due to: ", error)
    return []
  }
}