// Services
import { userCart } from "../services/userCart.js";
// Context
import { UserStatus } from "../context/UserContext.jsx";
// Hooks
import { useState,useContext,useEffect } from "react";
// Jsx
import { NavBar } from './NavBar.jsx'
import { CartButton } from "./CartButton.jsx";
// Css
import "./ShoppingCart.css"

export const ShoppingCart = () => {
  const allUserStatus = useContext(UserStatus)
  const [userCartInfo,setUserCartInfo] = useState({})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  useEffect(()=>{
    ;(async function (){
      try {
        const cartData = await userCart(allUserStatus.userId) // {...}
        setUserCartInfo(cartData)    
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  },[])
  if(loading) return <p>Cargando...</p>
  if(error) return <p>Hubo un error...</p>
  if(!userCartInfo){
    return(
      <>
        <span className={allUserStatus.pageTheme}>
          <NavBar />
          <section id="cartSection" className="cartSection" >
            <div className="guestCart">
              <h1>Wow! Such empty.</h1>
              <h2>Please consider log in to see your cart or register.</h2>
            </div>
          </section>
        </span>
      </>
    )
  }
  return(
    <>
      <span className={allUserStatus.pageTheme}>
        <NavBar />
        <section id="cartSection" className="cartSection" >
          {
            userCartInfo.carts[0].products.map((product)=>{
              return(
                <div key={product.id} className="productData">
                  <img className="productThumbnail" src={product.thumbnail} alt={product.title} />
                  <div className="productInformation">
                    <h3>{product.title}</h3>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Sub-Total:{product.total}</p>
                    <p>Discount: {product.discountPercentage}%</p>
                    <p>Discounted Total: ${product.discountedTotal}</p>
                  </div>
                  <CartButton productId={product.id} />
                </div>  
              )
            })
          }
          <div className="totalToPay">
            <p>Total products: {userCartInfo.carts[0].totalProducts}</p>
            <p>Quantity: {userCartInfo.carts[0].totalQuantity}</p>
            <p>Sub-Total: ${userCartInfo.carts[0].total}</p>
            <p>Discounted Total: ${userCartInfo.carts[0].discountedTotal}</p>
          </div>
        </section>
      </span>
    </>
  )
}