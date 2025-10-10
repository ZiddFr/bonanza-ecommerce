import { useMemo } from 'react'
import { Link } from "react-router-dom"
import { BsCart, BsCartPlus, BsCartPlusFill, BsCartDash, BsCartDashFill, BsCartCheckFill, BsCartXFill } from 'react-icons/bs'
import { CiLogin } from "react-icons/ci";
import "./CartButton.css"

export function CartButton({whatCartType,productId}){
  const redirectToLogIn = () => {
   
  }
  const addToCart = () => {

  }
  const removeFromCart = () => {

  }
  let cartType;
  let userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
  let logStatus = userPreferences["logStatus"]
  let cartItems = userPreferences["cartItems"]

  let productInCart = Boolean
  if(Array.isArray(cartItems)){
    if(cartItems.includes(productId)){
      productInCart = true
    } else {
      productInCart = false
    }  
  }
  const guestType = useMemo(()=>{
    return(
      <Link 
      id="logIn-register"
      reloadDocument
      to={{
        pathname: "/loginregisterform"
      }}
      >
        <button className="generalCartButton guestCartType" onClick={redirectToLogIn}>
          <BsCart />
        </button>
      </Link>
/*      
      <NavLink
        reloadDocument
        id="logIn-register"
        to={`/bonanza-ecommerce/loginregisterform`}
        >
      </NavLink>
*/
      )
  })
  const productForGuestCartType = useMemo(()=>{
      return(
      <button className="generalCartButton productForGuestCartType" onClick={redirectToLogIn}>
        <BsCart />
      </button>
    )    
  })
  const loggedUserCartType = useMemo(()=>{
    return(
      <button className="generalCartButton userCartType">
        <BsCart />
      </button>
    )
  })
  const productForUserCartType = useMemo(()=>{
    if(productInCart){
      return(
        <button className="generalCartButton productForUserCartType removeFromCart">
          <BsCartDash onClick={removeFromCart} />
        </button> 
      )
    } else if(productInCart == false){
      return(
        <button className="generalCartButton productForUserCartType addToCart">
          <BsCartPlus onClick={addToCart} />
        </button>  
      )
    }
  })
  const canLogIn = useMemo(()=>{
    return(
      <Link
        reloadDocument
        id="logIn-register"
        to={{
          pathname: `/loginregisterform`
        }}
        >
        <button className="generalCartButton">
          <CiLogin />
        </button>
      </Link>
    )
  })

  if (logStatus && whatCartType === "loggedUserCartType"){
    cartType = loggedUserCartType
  } else if (logStatus && whatCartType === "productCartType"){
    cartType = productForUserCartType
  } else if (!logStatus && whatCartType === "guestUserCartType"){
    cartType = guestType
  } else if (!logStatus && whatCartType === "productCartType"){
    cartType = productForGuestCartType
  }  else if (!logStatus && whatCartType === "canLogIn"){
    cartType = canLogIn
  }
  return(
    <>
      {cartType}
    </>
  )
}