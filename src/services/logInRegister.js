// API - Services
import { API } from "./api.js"
export async function logInRegister(formType,useName,userPassword,userEmail){
  if(formType === "login"){
    try {
      const response = await fetch(API.LOGIN,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: useName,
          password: userPassword,
          expiresInMins: 30, // optional, defaults to 60           
        }),
        credentials: 'include'
      })
      const userData = await response.json()
      if (response.ok && !userData.error){
        return userData
      } else {
        console.error("Couldn't access to the services due to error: ", userData.error)
        return null
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }
  if(formType === "register"){
    try {
      const response = await fetch(API.REGISTER,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: useName,
          password: userPassword,
          email: userEmail
        }),
        credentials: 'include'
      })
      const userData = await response.json()
      if (response.ok && !userData.error) {
       console.log("Login successful.")
       return userData
      } else {
        console.error("Couldn't register new user:", userData.error || "Invalid credentials")
        return null
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }
}