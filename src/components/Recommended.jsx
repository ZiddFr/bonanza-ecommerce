// Custom Hook
import { useRecommended } from "../hooks/useRecommended.jsx";
// Jsx
import { ProductCard } from "./ProductCard.jsx";
// Css
import "./Recommended.css"

export function Recommended(){
  const allRecommended = useRecommended()
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