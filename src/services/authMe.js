// API - Services
import { API } from './api.js'
export async function authMe(userToken){
  try {
    const response = await fetch(API.AUTH_ME,{
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if(!response.ok) throw new Error("Solicitud fallida.")
    const userData = await response.json()
    if(response.ok && !userData.error){
      return userData["id"]
    } else {
      console.error("Couldn't authenticate token: ", userData.error || "Invalid credentials")
      return null
    }
  } catch (error) {
    console.error("Network error:", error)
    return null
  }
}