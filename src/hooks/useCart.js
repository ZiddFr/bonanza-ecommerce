// Services
import { userCart } from "../services/userCart";
// Context
import { UserStatus } from "../context/UserContext";
// Hooks
import { useContext,useEffect,useState } from "react";

export function useCart(){
  const allUserContext = useContext(UserStatus)
  const [cartIds, setCartsIds] = useState([])
  useEffect(()=>{
    if(!allUserContext.userId) return // revisar !userId y userId == 0
    let cartDataIds = []
    (async function(){
      try {
        const cartData = await userCart(allUserContext.userId)
        for(let i=0;i<cartData["carts"].length;i++){
          cartDataIds.push(cartData["carts"][i]["id"])
        }
        setCartsIds(cartDataIds)
      } catch (error) {
        console.error("Couldn't get cart data due to: ", error)
        setCartsIds([])
      }
    })()
  },[])
  return cartIds
}