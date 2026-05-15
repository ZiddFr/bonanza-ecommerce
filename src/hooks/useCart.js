// Services
import { userCart } from "../services/userCart";
// Context
import { UserStatus } from "../context/UserContext";
// Hooks
import { useContext,useEffect,useState } from "react";

export function useCart(){
  const allUserStatus = useContext(UserStatus)
  const [cartIds, setCartsIds] = useState([])
  useEffect(()=>{
    if(!allUserStatus.userId) return // revisar !userId y userId == 0
    let cartsProductsIds = [];
    ;(async function(){
      try {
        const cartData = await userCart(allUserStatus.userId)
        const cartsProducts = cartData.carts[0].products // [{"id",...},{...},...]
        for(let i=0;i<cartsProducts.length;i++){
          cartsProductsIds.push(cartsProducts[i]["id"])
        }
        setCartsIds(cartsProductsIds)
      } catch (error) {
        console.error("Couldn't get cart data due to: ", error)
        setCartsIds([])
      }
    })()
  },[])
  return cartIds
}