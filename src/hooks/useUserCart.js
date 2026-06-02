// Context
import { UserStatus } from "../context/UserContext";
import { userCart } from "../services/userCart";
// Hooks
import { useContext, useEffect, useState } from "react";
export function useUserCart(){
  const [userCartIds,setUserCartIds] = useState([])
  const allUserStatus = useContext(UserStatus)
  useEffect(()=>{
    let cartsProductsIds = [];
    ;(async function(){
      try {
        if(!allUserStatus.userId) return
        const cartData = await userCart(allUserStatus.userId) //{}
        if(!cartData) return
        const cartsProducts = cartData.carts[0].products // [{"id",...},{...},...]
        for(let i=0;i<cartsProducts.length;i++){
          cartsProductsIds.push(cartsProducts[i]["id"])
        }
        setUserCartIds(cartsProductsIds)
      } catch (error) {
        console.error(error)
        setUserCartIds([])
      }  
    })()
  },[allUserStatus.userId])
  return {userCartIds,setUserCartIds}
}