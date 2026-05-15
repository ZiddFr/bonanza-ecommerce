// Hooks
import { useEffect, useState } from "react"
// Services
import { products } from "../services/products.js";
// Utils
import { hotDealsProducts } from "../utils/hotDealsProducts.js";
// Jsx
import { ProductCard } from "./ProductCard.jsx";
// Css
import "./Recommended.css"
import { filteringArrays } from "../utils/filteringArrays.js";

export function Recommended(){
  const [allRecommended, setAllRecommended] = useState([])
  useEffect(()=>{
    ;(async function gettingProductsInfo(){
      const hDProducts = await hotDealsProducts() // [...]
      const allProductsData = await products() // []
      const allProducts = allProductsData ?? [];
      const bestRated = allProducts.filter(prod => prod.rating > 3.2)
      const {normalProducts,hotDealProducts} = filteringArrays(bestRated,hDProducts)
      const recommended = [
        ...normalProducts.map((prod)=>({...prod,isHotDeal:false})),
        ...hotDealProducts.map((prod)=>({...prod,isHotDeal:true}))
      ]
      setAllRecommended(recommended)
    })()
  },[])
  return(
    <>
      <section className="recommended_products">
        <h2>Products you may like:</h2>
        <div className="productsCardsPreview">
          {
            allRecommended.map(product=>{
              return(
                <ProductCard key={product.id} product={product} />
              )
            })
          }
        </div>
      </section>
    </>
  )
}