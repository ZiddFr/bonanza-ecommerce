// hooks
import { useNavigate } from "react-router-dom";

// icons
import { CiLogout } from "react-icons/ci";

// js

// css
import "./LogOut.css"

export const LogOut = () => {
  const navigate = useNavigate()
  const handleLogOut = () =>{
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict"
    navigate('/')
  }
  return(
    <>
      <button id="logOutButton" onClick={handleLogOut}><CiLogout/></button>
    </>
  )
}