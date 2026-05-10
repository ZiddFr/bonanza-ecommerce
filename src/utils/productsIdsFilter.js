// Services
import { products } from "../services/products.js"
export async function producstIdsfilter(productsIds){
  const productsData = await products()
  const allProducts = productsData["products"]
  let productsInOffer;
  productsInOffer = allProducts.filter((product)=>{
    return productsIds.includes(product["id"])
  })
  return productsInOffer
}