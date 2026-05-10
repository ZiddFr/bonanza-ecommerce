// Context
import { UserStatus } from '../context/UserContext';
// Hook React-router
import { useNavigate } from 'react-router-dom';
// Hook
import { useContext } from 'react';
import { useCart } from '../hooks/useCart';
// React icons
import { BsCartPlus,BsCartDash } from 'react-icons/bs'
// Css
import "./CartButton.css"
export function CartButton({productId}){
  const allUserContext = useContext(UserStatus)
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
  const productsIdsInUserCart = useCart()
  let cartIcon = ""
  if(allUserContext.logStatus) {
    if(productsIdsInUserCart.includes(productId)){
      cartIcon = "addProduct"
    } else {
      cartIcon = "removeProduct"
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