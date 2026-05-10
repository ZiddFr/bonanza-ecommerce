export function filteringArrays(product_ByCategory,hotDealProducts){
  const hotDealIds = new Set(hotDealProducts.map(hot => hot.id))
  // normal products
  let filteredA = [] // normal products
  let filteredB = [] // hotDeal products
  for(const product of product_ByCategory){
    if(hotDealIds.has(product.id)){
      filteredB.push(product)
    } else {
      filteredA.push(product)
    }
  }
  return {
    normalProducts: filteredA,
    hotDealProducts: filteredB
  }
}