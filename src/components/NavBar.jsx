import { Link } from "react-router-dom"
import { Logo } from './Logo.jsx'
import { SearchBar } from './SearchBar.jsx'
import { LogOut } from './LogOut.jsx'
import { CartButton } from "./CartButton.jsx"
import { IoSettingsOutline } from "react-icons/io5"
//import { PageThemes } from './PageThemes.jsx'
import './NavBar.css'

export const NavBar = ({logStatus,pageTheme,userId}) => {
  const requestLogStatus = () => {
    let cookie = document.cookie
    const userToken = cookie.split("=")[1]
    return userToken
  }
  const userToken = requestLogStatus() // Yes, this () was supose to be an axios/fetch thing but I just thought it'll be better if I worked with the token
  return(
    <>
      <section id="NavBar-wrapper" className={`NavBar-wrapper ${pageTheme}`}>
        <Logo />
        <SearchBar />
        {
          (()=>{
            if(logStatus == true) {
              return(
                <>
                  <div className="navBarButtons userButtons">
                    <Link
                    id="userSettings"
                    reloadDocument
                    to={{
                      pathname: `/bonanza-ecommerce/userprofile/${userToken}`
                    }}
                    >
                      <button>
                        <IoSettingsOutline />
                      </button>

                    </Link>
                    <Link
                    id="userCartButton"
                    reloadDocument
                    to={{
                      pathname: `/bonanza-ecommerce/shoppingcart/${userId}`
                    }}
                    >
                      <CartButton whatCartType={"loggedUserCartType"}/>
                    </Link>
                    <LogOut />
                  </div>
                </>
              )
            } else if ( logStatus == false ){
              userId = "guest"
              return(
                <>
                  <div className="navBarButtons guestButtons">
                    <CartButton whatCartType={"guestUserCartType"} />
                    <CartButton whatCartType={"canLogIn"}/>
                  </div>
                </>
              )
            }
          })()
        }
      </section>
    </>
  )
}