import { CiLogout } from "react-icons/ci";
import "./LogOut.css"

export const LogOut = () => {
  const logOut = ()=>{
    document.cookie = "token=; path=/;"
    let userPreferences = JSON.parse(localStorage.getItem("userPReferences"))
    userPreferences = {
      userId: 0,
      pageTheme: "faddingEmerald",
      logStatus: false,
      cartItems: 0
    }
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences))
    location.replace("https://ZiddFr.github.io/bonanza-ecommerce/")
  }
  return(
    <>
      <button id="logOutButton" onClick={logOut}><CiLogout /></button>
    </>
  )
}