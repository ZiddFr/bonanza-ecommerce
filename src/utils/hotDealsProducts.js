// Services
import {products} from '../services/products.js'
export async function hotDealsProducts(){
  try {
    const allProducts = await products()
    const list = allProducts ?? []
    return list.filter(prod => prod.discountPercentage > 15)
  } catch (error) {
    console.error(error)
    return []
  }
}