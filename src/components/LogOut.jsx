// Context
import { UserStatus } from '../context/UserContext.jsx'
// React-router-dom Hooks
import { useNavigate } from "react-router-dom";
// React Hooks
import { useContext } from 'react';
// Custom hooks
import { useLocalStorage } from '../hooks/useLocalStorage.js';
// icons
import { CiLogout } from "react-icons/ci";
// js
// css
import "./LogOut.css"
export const LogOut = () => {
  const navigate = useNavigate()
  const allUserStatus = useContext(UserStatus)
  const handleLogOut = () =>{
    allUserStatus.setUserId(null)
    allUserStatus.setPageTheme("faddingEmerald")
    allUserStatus.setLogStatus(false)
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict"
    allUserStatus.setToken(null)
    const [logStatus,setLogStatus] = useLocalStorage("logStatus",false)
    const [userId,setUserId] = useLocalStorage("userId",null)
    const [pageTheme,setPageTheme] = useLocalStorage("pageTheme","faddingEmerald")
    navigate('/')
  }
  return(
    <>
      <button id="logOutButton" onClick={handleLogOut}><CiLogout/></button>
    </>
  )
}