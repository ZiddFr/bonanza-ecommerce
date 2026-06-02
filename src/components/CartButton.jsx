// Context
import { UserStatus } from '../context/UserContext';
import { CartStatus } from '../context/CartContext';
// Hook React-router
import { useNavigate } from 'react-router-dom';
// Hook
import { useContext } from 'react';
// React icons
import { BsCartPlus,BsCartDash } from 'react-icons/bs'
// Css
import "./CartButton.css"
export function CartButton({productId}){
  const allUserStatus = useContext(UserStatus)
  const allCartStatus = useContext(CartStatus)
  const navigate = useNavigate()
  const handleRedirectToLogIn = () => {
    navigate("/loginregisterform")
  }
  const handleAddToCart = () => {
    // está en el carrito? no? agrégalo
    // pendiente hasta tener DB o tal vez no...
  }
  const handleRemoveFromCart = () => {
    // pendiente hasta tener DB o tal vez no...
  }
  function handleClick(funToHandle){
    switch(funToHandle){
      case "guestCart": handleRedirectToLogIn(); break;
      case "addProduct": handleAddToCart(); break;
      case "removeProduct": handleRemoveFromCart(); break;
    }
  }
  const productsIdsInUserCart = allCartStatus.userCartIds
  let cartIcon = ""
  if(allUserStatus.logStatus) {
    if(productsIdsInUserCart.includes(productId)){
      cartIcon = "removeProduct"
    } else {
      cartIcon = "addProduct"
    }
  } else {
    cartIcon = "guestCart"
  }
  const iconCartTypes = {
    guestCart: <BsCartPlus />,
    removeProduct: <BsCartDash />,
    addProduct: <BsCartPlus />,
  }
  return(
    <button className='generalCartButton' onClick={()=>{
      handleClick(cartIcon)
    }}>
      {iconCartTypes[cartIcon]}
    </button>
  )
}