// Services
import { API } from "./api.js"
export async function products(){
  try {
    const response = await fetch(API.PRODUCTS)
    if(!response.ok) throw new Error('Solicitud fallida')
    const productsData = await response.json()
    let allProducts = []
    for(let i=0;i<productsData["products"].length;i++){
      allProducts.push(productsData["products"][i])
    }
    return allProducts
  } catch (error) {
    console.error("Couldn't get products data due to: ", error)
    return []
  }
}