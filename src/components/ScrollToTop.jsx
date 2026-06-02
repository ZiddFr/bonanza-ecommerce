// React Hook
import { useEffect } from "react";
// React-router-dom Hook
import { useLocation } from "react-router-dom";
export function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
  return null
}