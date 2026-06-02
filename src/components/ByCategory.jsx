// Context
import { UserContext } from "../context/UserContext";
// Services
import { productsByCategory } from "../services/productsByCategory";
// React Hooks
import { useEffect, useState} from "react";
// Jsx
import { ProductCard } from "./ProductCard";
// Css
import './ByCategory.css'
export function ByCategory({searchByCategory}){
  const [categoryData,setCategoryData] = useState([])
  useEffect(()=>{
    (async function(){
      const data = await productsByCategory(searchByCategory)
      setCategoryData(data)
    })()
  },[searchByCategory])
  return(
    <>
      <section className="byCategory">
        <h2 className="hByCategory">Other products in the same category</h2>
        <div className="producstByCategory">
          {categoryData.map((product,ind)=>{
            return(
              <ProductCard key={ind} product={product}/>
            )
          })}  
        </div>
      </section>
    </>
  )
}