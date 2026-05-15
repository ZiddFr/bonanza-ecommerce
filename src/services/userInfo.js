// Services
import { API } from "./api.js";
export async function userInfo(userId){
  try {
    const response = await fetch(API.USER_INFO + `/${userId}`)
    if(!response.ok) throw new Error("Solicitud fallida")
    const userData = await response.json()
    return userData
  } catch (error) {
    console.error("Couldn't get the information requested")
    return {}
  }
}