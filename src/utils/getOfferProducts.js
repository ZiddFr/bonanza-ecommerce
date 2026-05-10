// Services
import { products } from '../services/products.js'
import { productsIds } from '../services/productsIds.js'
// Utils
import { producstIdsfilter } from './productsIdsFilter.js'
import { gettingProductsFakeIds } from './gettingProductsFakeIds.js'
export async function getOfferProducts(){
  hotDealProducts = []
  try {
    const allProducts = await products()
    const allIds = await productsIds()
    let fakeIds = gettingProductsFakeIds(allIds,6)
    let filteredData = await producstIdsfilter(fakeIds)
    return hotDealProducts
  } catch (error) {
    console.error("Couldn't get data due to: ", error)
    return []
  }
}