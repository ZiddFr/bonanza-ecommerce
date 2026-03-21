import axios from "axios";
import { useEffect, useState } from "react";
export function useCart(userId){
  const [cartIds, setCartsIds] = useState([])
  useEffect(()=>{
    if(!userId) return
    let cartDataIds = []
    axios({
      method: "GET",
      url: `https://dummyjson.com/carts/user/${userId}`,
    })
    .then(response=>{
      const data = response.data
      for(let i=0;i<data["carts"].length;i++){
        cartDataIds.push(data["carts"][i]["id"])
      }
      setCartsIds(cartDataIds)
    })
    .catch (error=>{
      cartIds = []
      console.log("Error reading cart items: ", error)
    })
  },[userId])
  return cartIds
}