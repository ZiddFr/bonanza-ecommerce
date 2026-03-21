import axios from "axios";
export async function authMe(userToken){
  try {
    const response = await axios({
      method: "GET",
      url: "https://dummyjson.com/auth/me",
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      withCredentials: 'include'
    })
    const userData = response.data
    return userData
  } catch (error) {
    console.log("Couldn't authenticate token: ", error)
    return null
  }
}