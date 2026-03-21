import axios from "axios";
export async function logInRegister(formType,useName,userPassword,userEmail){
  if(formType === "login"){
    try {
      const response = await axios({
        method: "POST",
        url: "https://dummyjson.com/auth/login",
        headers:{
          "Content-Type": "application/json"
        },
        data: {
          username: useName,
          password: userPassword,
          expiresInMins: 30, // optional, defaults to 60        
        },
        withCredentials: "include",
      })
      const userData = response.data
      return userData
    } catch (error) {
      console.log("Couldn't access to the services due to error: ", error)
      return null
    }  
  }
  if(formType === "register"){
    try {
      const response = await axios({
        method: "POST",
        url: "https://dummyjson.com/users/add",
        headers:{
          "Content-Type": "application/json"
        },
        data: {
          username: useName,
          password: userPassword,
          email: userEmail
          /* más datos en otro tiempo */
        },
        withCredentials: "include",
      })
      const userData = response.data
      return userData
    } catch (error) {
      console.log("Couldn't register new user.")
      return null
    }
  }
}