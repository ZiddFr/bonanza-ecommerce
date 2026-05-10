// Hooks
import { useCategory } from "../hooks/useCategory";
// Jsx
import { ProductCard } from "./ProductCard.jsx";
// css
import "./CategoriesSection.css"
// categoryData
// {
//   categoryName: name,
//   normalProducts,
//   hotDealProducts
// }
export function CategoriesSection({categoryLimit}){
  const {categoryData,loading} = useCategory(categoryLimit)
  if(loading) return <p>Cargando....</p>
  return(
    <>
      {
        categoryData.map((category)=>{
          const products = [
            ...category.normalProducts.map((prod)=>({...prod,isHotDeal:false})),
            ...category.hotDealProducts.map((prod)=>({...prod,isHotDeal:true}))
          ]
          return(
            <section key={category.categoryName} className={`category__${category.categoryName}`}>
              <h1>{category.categoryName}</h1>
              {
                products.map(product=>(
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </section>
          )
        })
      }
    </>
  )
}