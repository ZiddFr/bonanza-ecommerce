// Context
import { UserStatus } from "../context/UserContext.jsx"
// Services
import { productPage } from "../services/productPage.js"
// Hooks
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
// Jsx
import { CategoriesSection } from './CategoriesSection.jsx'
import { NavBar } from './NavBar.jsx'
import { Recommended } from "./Recommended.jsx"
import { CartButton } from "./CartButton.jsx"
import { ScrollUpButton } from "./ScrollUpButton.jsx"
import { ReviewCard } from "./ReviewCard.jsx"
import { ByCategory } from "./ByCategory.jsx"
// Css
import "./DisplayProduct.css"
/// Img 777
import banan from '../imagenes/banan.png'
export function DisplayProduct(){
  const allUserStatus = useContext(UserStatus)
  const { productId } = useParams()
  const [productData,setProductData] = useState({})
  const [index,setIndex] = useState(0)
  const handleShow = (ind) => {
    setIndex(ind)
  }
  useEffect(()=>{
    ;(async function getProductData(){
      let allDataProduct = await productPage(productId)
      setProductData(allDataProduct)
    })()
  },[productId])
  if(Object.keys(productData).length === 0){
    return(
      <>
        <div className={`loadingProduct ${allUserStatus.pageTheme} pageTransition`}>
          <NavBar />
          <div id="loadingProduct">
            <h1>Loading product... While wait take banana... here...</h1>
            <img src={banan} alt="No Product, we sorry, you take banana..." />
          </div>
        </div>
        <Recommended />
      </>
    )
  } else {
    const finalPrice = (productData.price - (productData.price * productData.discountPercentage / 100)).toFixed(2)
    return(
      <>
        <section id="displayProduct" className={`displayProduct ${allUserStatus.pageTheme} pageTransition`}>
          <NavBar />
          <section id="displayingProduct" className="displayingProduct">
            <div key={productId} id="allProductContent" className="displayTransition">
              <section className="principalProducInfo">
                <div className="imagesContainer">
                  <div id="standByImgs" className="standByImgs">
                    {
                      productData.images.map((productImgSrc,ind)=>{
                        return(
                          <img key={`productImg-${ind}`} src={productImgSrc} alt={`${productData.title}`} className={`inStandByImg productImage-${productImgSrc}`} onMouseEnter={()=>{
                          handleShow(ind)
                          }}
                        />
                        )
                      })
                    }
                  </div>
                  <div id="showingImg">
                    <img src={productData.images[index]} alt={`${productData.title}`}
                    className="activeImg" />
                  </div>
                </div>
                <div className="productInfoContainer">
                  <h1 className="productTitle">{productData.title}</h1>
                  <p className="productRating">Rate: {productData.rating}</p>
                  <div className="productPricing">
                    <p className="productPrice">Price: {productData.price}</p>
                    <p className="productDiscountPercentage">Discount: {productData.discountPercentage}%</p>
                    <p className="productFinalPrice">Total: ${finalPrice}</p>
                  </div>
                  <div className="productMeta">
                    <div className="productSpecs">
                      <p className="productBrand">Brand: {productData.brand}</p>
                      <p className="productCategory">Category: {productData.category}</p>
                      <p className="productInStock">Stock: {productData.stock}</p>
                    </div>
                  </div>
                  <ul className="productTags">
                    {productData.tags.map((tag,ind)=>{
                      return (
                        <li key={`tag-${tag}-${ind}`} className={`productTag ${tag}`}>{tag}</li>
                      )
                    })}
                  </ul>
                  <div className="productStatus">
                    <p className="productAvailability">Available Status: {productData.availabilityStatus}</p>
                    <p className="productMinimumOrderQuantity">Minimum order quantity: {productData.minimumOrderQuantity}</p>
                  </div>
                  <CartButton productId={productData.id}/>
                </div>
              </section>
              <section className="descriptionContainer">
                <table border={1} className="productDescriptionTable">
                  <thead>
                    <tr><th colSpan={2}>Product Information</th></tr>
                  </thead>
                  <tbody>
                    <tr><th colSpan={2}>Description:</th></tr>
                    <tr><td colSpan={2}><p className="productDescription">{productData.description}</p></td></tr>
                    <tr><th colSpan={2}>Dimensions:</th></tr>
                    <tr>
                      <td><p className="productDimensionWidth">Width:</p></td>
                      <td><p>{productData.dimensions.width}</p></td>
                    </tr>
                    <tr>
                      <td><p className="productDimensionHeight">Height:</p></td>
                      <td>{productData.dimensions.height}</td>
                    </tr>
                    <tr><th colSpan={2}>Policy</th></tr>
                    <tr>
                      <td>Warranty:</td>
                      <td>{productData.warrantyInformation}</td>
                    </tr>
                    <tr>
                      <td>Shipping Information:</td>
                      <td>{productData.shippingInformation}</td>
                    </tr>
                    <tr><th colSpan={2}>Return policy</th></tr>
                    <tr><td colSpan={2}>{productData.returnPolicy}</td></tr>
                  </tbody>
                </table>
              </section>
              <section className="reviewsContainer">
                <h2>User comments:</h2>
                <div className="reviews">
                  {
                    productData.reviews.map((review, ind)=>{
                      return(
                        <ReviewCard key={`reviewProduct-${ind}`} review={review} /> 
                      )
                    })
                  }
                </div>
              </section>
            </div>
          </section>
          <section className="otherProductsSection">
            <ByCategory searchByCategory={productData.category} />
            <Recommended />
          </section>  
          <ScrollUpButton />
        </section>
      </>
    )
  }
}