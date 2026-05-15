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
  useEffect(()=>{
    ;(async function(){
      try {
        const accessToken = document.cookie.split('; ').find(row=>row.startsWith('access_token='))?.split("=")[1]
        if(!accessToken) throw new Error("Null Token")
        const userId = await authMe(accessToken)
        setUserId(userId)
        const savedTheme = localStorage.getItem("pageTheme") ?? "beeMeMeBee"
        setPageTheme(savedTheme) // "beeMeMeBee"
        setLogStatus(true)
        document.cookie = `access_token=${accessToken}; max-age=300; SameSite=Strict; Secure`
        setToken(accessToken)
      } catch (error) {
        console.log("Couldn't access: ",error)
        setUserId(null)
        setPageTheme("faddingEmerald")
        setLogStatus(false)
        document.cookie = "access_token=; max-age=0; SameSite=Strict; Secure"
        setToken(null)
      }
    })()
  },[])
  return {token,setToken,logStatus,setLogStatus,userId,setUserId,pageTheme,setPageTheme}
}