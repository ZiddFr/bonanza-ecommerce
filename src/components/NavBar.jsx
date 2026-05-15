// hooks
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
// context
import { UserStatus } from '../context/UserContext.jsx'

// jsx
import { Logo } from './Logo.jsx'
import { SearchBar } from './SearchBar.jsx'
import { LogOut } from './LogOut.jsx'

// js

// css
import './NavBar.css'

// icons
import { IoSettingsOutline } from "react-icons/io5"
import { BsCart } from 'react-icons/bs'
import { CiLogin } from "react-icons/ci";

export const NavBar = () => {
  const allUserContext = useContext(UserStatus)
  const navigate = useNavigate()
  function handleUserSettings(){
    navigate(`/userprofile/${allUserContext.userId}`)
  }
  function handleShoppingCart(){
    navigate(`/shoppingcart/${allUserContext.userId}`)
  }
  function handleLoginForm(){
    navigate(`/loginregisterform`)
  }
  if(allUserContext.logStatus){
    return(
      <>
        <section id="NavBar-wrapper" className={`NavBar-wrapper ${allUserContext.pageTheme}`}>
          <Logo />
          <SearchBar />
          <div className="navBarButtons userButtons">
            <button onClick={handleUserSettings}><IoSettingsOutline /></button>
            <button className="generalCartButton" onClick={handleShoppingCart}><BsCart /></button>
            <LogOut />
          </div>
        </section>
      </>
    )
  } else {
    return(
      <>
        <section id="NavBar-wrapper" className={`NavBar-wrapper faddingEmerald`}>
          <Logo />
          <SearchBar />
          <div className="navBarButtons guestButtons">
            <button id="logIn-register" onClick={handleLoginForm}><CiLogin/></button>
          </div>
        </section>
      </>
    )  
  }
}