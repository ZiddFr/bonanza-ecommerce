import { createContext } from 'react'
import { useAuthMe } from '../hooks/useAuthMe.js'
export const UserStatus = createContext(null)
export function UserContext({children}){
  const {token,setToken,logStatus,setLogStatus,userId,setUserId,pageTheme,setPageTheme} = useAuthMe()
  return(
    <UserStatus.Provider value={{token,setToken,logStatus,setLogStatus,userId,setUserId,pageTheme,setPageTheme}}>
      {children}
    </UserStatus.Provider>
  )
}