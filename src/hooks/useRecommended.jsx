
// Services
import { products } from '../services/products.js'
// Utils
import { hotDealsProducts } from '../utils/hotDealsProducts.js'
import { filteringArrays } from '../utils/filteringArrays.js'
import { randomizer } from '../utils/randomizer.js'
// React Hooks
import { useState,useEffect } from 'react'
export function useRecommended(){
  const [allRecommended, setAllRecommended] = useState([])
  useEffect(()=>{
    ;(async function(){
      const hDProducts = await hotDealsProducts() // [...]
      const allProductsData = await products() // []
      const allProducts = allProductsData ?? [];
      const bestRated = allProducts.filter(prod => prod.rating > 3.2)
      const limitedBestRated = randomizer(bestRated,7)
      //const limitedHotDeals = randomizer(hDProducts,20)
      const {normalProducts,hotDealProducts} = filteringArrays(limitedBestRated,hDProducts)
      const recommended = [
        ...normalProducts.map((prod)=>({...prod,isHotDeal:false})),
        ...hotDealProducts.map((prod)=>({...prod,isHotDeal:true}))
      ]
      setAllRecommended(recommended)
    })()
  },[])
  return allRecommended
}