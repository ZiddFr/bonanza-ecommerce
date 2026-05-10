// Hooks
import { useEffect, useState } from "react";
// Custom Hooks
import { useLocalStorage } from "./useLocalStorage";
// Services
import { authMe } from "../services/authMe";
export function useAuthMe(){
  const [token,setToken] = useState(null)
  const [logStatus,setLogStatus] = useLocalStorage("logStatus",false)
  const [userId,setUserId] = useLocalStorage("userId",null)
  const [pageTheme,setPageTheme] = useLocalStorage("pageTheme","faddingEmerald")
  const accessToken = document.cookie.split('; ').find(row=>row.startsWith('access_token='))
  useEffect(()=>{
    const userData = authMe(accessToken)
    userData.then((data)=>{
      setUserId(data["id"])
      const savedTheme = localStorage.getItem("pageTheme") ?? "faddingEmerald"
      setPageTheme(savedTheme) // "beMeMeBee"
      setLogStatus(true)
      const userToken = document.cookie=`access_token=${data["accessToken"]}; SameSite=Strict; Secure`
      setToken(userToken)
    })
    .catch((error)=>{
      console.log("Couldn't access: ",error)
      setUserId(null)
      setPageTheme("faddingEmerald")
      setLogStatus(false)
      document.cookie=document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict"
      setToken(null)
    })
  },[accessToken])
  return {token,setToken,logStatus,setLogStatus,userId,setUserId,pageTheme,setPageTheme}
}