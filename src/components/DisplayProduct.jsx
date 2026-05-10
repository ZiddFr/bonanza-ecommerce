// Context
import { UserStatus } from "../context/UserContext.jsx"
// Services
import { productPage } from "../services/productPage.js"
// Hooks
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
// Jsx
import { NavBar } from './NavBar.jsx'
import { Recommended } from "./Recommended.jsx"
// Css
import "./DisplayProduct.css"
/// Img 777
import banan from '../imagenes/banan.png'
export function DisplayProduct(){
  const allUserContext = useContext(UserStatus)
  const { productId } = useParams()
  const [productData,setProductData] = useState({})
  const [index,setIndex] = useState(0)
  const handleShow = (ind) => {
    setIndex(ind)
  }
  useEffect(()=>{
    (async function getProductData(){
      let allDataProduct = await productPage(productId)
      setProductData(allDataProduct)
    })()
  },[])
  if(Object.keys(productData).length === 0){
    return(
      <>
        <div className={`${allUserContext.pageTheme}`}>
          <NavBar />
          <div id="displayingProduct">
            <h1>Loading product... While wait take banana... here...</h1>
            <img src={banan} alt="No Product, we sorry, you take banana..." />
          </div>
        </div>
      </>
    )
  } else {
    const finalPrice = (productData.price - (productData.price * productData.discountPercentage / 100)).toFixed(2)
    return(
      <>
        <span className={allUserContext.pageTheme}>
          <section id="displayingProduct">
            <div id="allProductContent">
              <div className="imagesContainer">
                <div id="standByImgs" className="standByImgs">
                  {
                    productData.images.map((productImgSrc,ind)=>{
                      return(
                        <img key={ind} src={productImgSrc} alt={`${productData.title}`} className={`inStandByImg productImage-${productImgSrc}`} onMouseEnter={()=>{
                        handleShow(ind)
                        }}
                      />
                      )
                    })
                  }
                </div>
                <div id="showingImg">
                  <img src={productData.images[index]} alt={`${productData.title}`}
                  className="activeImg"
                  />
                </div>
              </div>
              <div className="productInfoContainer">
                <h1 className="productTitle">{productData.title}</h1>
                <p className="productBrand">Brand: {productData.brand}</p>
                <p className="productRating">Rate: {productData.rating}</p>
                <p className="productCategory">Category: {productData.category}</p>
                <p className="productStock">Stock: {productData.stock}</p>
                <p className="productPrice">Price: {productData.price}</p>
                <p className="productDiscountPercentage">Discount: {productData.discountPercentage}%</p>
                <p className="productFinalPrice">Total: ${finalPrice}</p>
                <div className="productTags">
                  {productData.tags.map((tag,ind)=>{
                    return (<p key={ind} className={`productTag ${tag}`}>{tag}</p>)
                  })}
                </div>
                <p className="productAvailability">Available Status: {productData.availabilityStatus}</p>
                <p className="productMinimumOrderQuantity">Minimum order quantity: {productData.minimumOrderQuantity}</p>
              </div>
              <div className="descriptionContainer">
                <p className="productDescription">{productData.description}</p>
                <div className="productDimensions">
                  <p className="productDimensionWidth">
                    Width: {productData.dimensions.width}
                  </p>
                  <p className="productDimensionHeight">
                    Height: {productData.dimensions.height}
                  </p>
                </div>
                <p className="productWarrantyInformation">Warranty: {productData.warrantyInformation}</p>
                <p className="productShippingInformation">
                  Shipping Information: {productData.shippingInformation}
                </p>
                <p className="productReturnPolicy">
                  Policy: {productData.returnPolicy}
                </p>
              </div>
              <div className="reviewsContainer">
                {
                  productData.reviews.map((review, ind)=>{
                    return(
                      <div key={ind} className="reviewDiv" style={{display:"flex",flexDirection:"column"}}>
                        <p className="reviewerNameReview">{review.reviewerName}</p>
                        <p className="reviewerRatingReview">{review.rating}</p>
                        <p className="reviewerDateReview">{review.date}</p>
                        <p className="reviewerComment">{review.comment}</p>
                      </div>  
                    )
                  })
                }
              </div>
            </div>
          </section>
          <section className="recommendedSection">
            <Recommended />
          </section>  
        </span>
      </>
    )
  }
}