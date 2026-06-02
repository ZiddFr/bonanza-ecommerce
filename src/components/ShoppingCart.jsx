// Services
import { userCart } from "../services/userCart.js";
// Context
import { UserStatus } from "../context/UserContext.jsx";
// Hooks
import { useState,useContext,useEffect } from "react";
// Jsx
import { NavBar } from './NavBar.jsx'
import { CartButton } from "./CartButton.jsx";
import { ScrollUpButton } from "./ScrollUpButton.jsx";
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
        <span className={`pageTransition ${allUserStatus.pageTheme}`}>
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
          <div className="cartProducts">
            {
              userCartInfo.carts[0].products.map((product)=>{
                return(
                  <div key={product.id} className="productData">
                    <img className="productThumbnail" src={product.thumbnail} alt={product.title} />
                    <div className="productInformation">
                      <h3>{product.title}</h3>
                      <p className="price">Price: ${product.price}</p>
                      <p className="quantity">Quantity: {product.quantity} units.</p>
                      <p className="subTotal">Sub-Total: ${product.total}</p>
                      <p className="discount">Discount: {product.discountPercentage}%</p>
                      <p className="discountedTotal">Discounted Total: ${product.discountedTotal}</p>
                    </div>
                    <CartButton productId={product.id} />
                  </div>  
                )
              })
            }
          </div>
          <div className="totalToPay">
            <h2>Order Summary</h2>
            <p className="totalProducts">Total products: {userCartInfo.carts[0].totalProducts}</p>
            <p className="totalQuantity">Quantity: {userCartInfo.carts[0].totalQuantity}</p>
            <p className="subTotal">Sub-Total: ${userCartInfo.carts[0].total}</p>
            <div className="grandTotal">
              <p className="discountedTotal">Discounted Total: ${userCartInfo.carts[0].discountedTotal}</p>  
            </div>
          </div>
          <ScrollUpButton />
        </section>
      </span>
    </>
  )
}