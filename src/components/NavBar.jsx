// Context
import { UserStatus } from '../context/UserContext.jsx'
// React Hooks
import { useContext } from "react"
// React-router-dom hooks
import { useNavigate,useLocation } from "react-router-dom"
// Jsx
import { Logo } from './Logo.jsx'
import { SearchBar } from './SearchBar.jsx'
import { LogOut } from './LogOut.jsx'
import { SwitchTheme } from './SwitchTheme.jsx'
// Js

// Css
import './NavBar.css'

// Icons
import { IoSettingsOutline } from "react-icons/io5"
import { BsCart } from 'react-icons/bs'
import { CiLogin } from "react-icons/ci";

export const NavBar = () => {
  const allUserStatus = useContext(UserStatus)
  const location = useLocation()
  const navigate = useNavigate()
  function handleUserSettings(){
    navigate(`/userprofile/${allUserStatus.userId}`)
  }
  function handleShoppingCart(){
    navigate(`/shoppingcart/${allUserStatus.userId}`)
  }
  function handleLoginForm(){
    navigate(`/loginregisterform`)
  }
  const userButtonsLocation = {
    singleUserSettingsLocation: <button className="userSettingsButton" onClick={handleUserSettings}><IoSettingsOutline /></button>,
    singleCartButtonLocation: <button className="userCartButton" onClick={handleShoppingCart}><BsCart /></button>
  }
  if(allUserStatus.logStatus){
    return(
      <>
        <section id="NavBar-wrapper" className={`NavBar-wrapper ${allUserStatus.pageTheme}`}>
          <Logo />
          <SearchBar />
          <div className="navBarButtons userButtons">
            {
              (location.pathname === "/" || location.pathname.startsWith("/displayproduct")) &&
              <>
                {userButtonsLocation.singleUserSettingsLocation}
                {userButtonsLocation.singleCartButtonLocation}
              </>
            }
            {
              location.pathname.startsWith(`/userprofile`) &&
              <>
                {userButtonsLocation.singleCartButtonLocation}
              </>
            }
            {
              location.pathname.startsWith(`/shoppingcart`) &&
              <>
                {userButtonsLocation.singleUserSettingsLocation}
              </>
            }
            <SwitchTheme />
            <LogOut />
          </div>
        </section>
      </>
    )
  } else {
    return(
      <>
        <section id="NavBar-wrapper" className={`NavBar-wrapper ${allUserStatus.pageTheme}`}>
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