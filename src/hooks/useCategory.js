// Services
import { productsByCategory } from "../services/productsByCategory.js"
// Hooks
import { useState,useEffect } from "react"
// Utils
import { filteringArrays } from "../utils/filteringArrays.js"
// Js
import { randomizer } from "../utils/randomizer.js"
import { productsCategories } from "../services/productsCategories.js"
import { hotDealsProducts } from "../utils/hotDealsProducts.js"
export function useCategory(limit){
  const [categoryData,setCategoryData] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    let isMounted = true
    ;(async function(){
      try {
        const categoriesList = await productsCategories()
        const chosenCategories = randomizer(categoriesList || [],limit)
        const hotDeals = await hotDealsProducts() // [...]
        const data = await Promise.all(
          chosenCategories.map(async (categoryName) =>{
            const products = await productsByCategory(categoryName) ?? []
            const {normalProducts,hotDealProducts} = filteringArrays(products,hotDeals)
            return {
              categoryName: categoryName,
              normalProducts: normalProducts,
              hotDealProducts: hotDealProducts
            }
          })
        )
        if(isMounted) setCategoryData(data)
      } catch (error) {
        console.error(error)
      } finally {
        if(isMounted) setLoading(false)
      }
    })()
    return()=>{
      isMounted = false
    }
  },[limit])
  return {categoryData,loading}
}