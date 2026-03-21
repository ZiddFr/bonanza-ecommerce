import axios from "axios"
export async function productsIds(){
  try {
    const response = await axios({
    method: "GET",
    url: "https://dummyjson.com/products?limit=0",
  })
    const ids = response.data["products"].map(product=> product["id"])
    return ids
  } catch (error) {
    console.log("Couldn't get products data due to: ", error)
    return []
  }
}