import axios from 'axios'
import { useMemo, useEffect, useContext, createContext } from 'react'
// components
import { NavBar } from './components/NavBar.jsx'
import { CategoriesSection } from './components/CategoriesSection.jsx'
import { OffersSection } from './components/OffersSection.jsx'
import { Recomended } from './components/Recomended.jsx'
import { Loader } from './components/Loader.jsx'
// js
import { randomizer } from './utils/randomizer.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
// css
import './Root.css'
import './App.css'



//let productsIds = gettingFakeIds()
// list of all the available categories dummyjson has
const category = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]

export function MainPage() {
  //agregar changeTheme,setChangeTheme  
  const productsIds = useMemo(gettingFakeIds,[])
  const categories = useMemo(()=> randomizer(category),[])
  const [userId,setUserId] = useLocalStorage("userId",null)
  const [pageTheme,setPageTheme] = useLocalStorage("pageTheme","faddingEmerald")
  const [logStatus,setLogStatus] = useLocalStorage("logStatus",false)

  useEffect(()=>{
   const accessToken = document.cookie.split('; ').find(row=>row.startsWith('access_token='))
    if(!userToken) return
    axios({
      method: "GET",
      url: "https://dummyjson.com/auth/me",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res=>{
      const userData = res.data
      setUserId(userData["id"])
      setPageTheme("beMeMeBee")
      setLogStatus(true)
    })
    .catch(error=>{
      setUserId(null)
      setPageTheme("faddingEmerald")
      setLogStatus(false)
      console.log(error)
    })
  },[])


  /* useMemo */
  const categoriesSection = useMemo(()=>
    <CategoriesSection cartId={cartId} cartItems={cartItems} productsIds={productsIds} categories={categories} logStatus={logStatus} />,[cartItems, logStatus, productsIds, categories]
  )
  const recomended = useMemo(()=>
    <Recomended cartId={cartId} cartItems={cartItems} productsIds={productsIds} logStatus={logStatus} />,[cartItems,productsIds,logStatus]
  )
  return (
    <div id="app" className={pageTheme}>
      <Loader pageTheme={pageTheme}/>
      <div id="main">
        <NavBar logStatus={logStatus} pageTheme={pageTheme} userId={userId} />
        <OffersSection productsIds={productsIds} pageTheme={pageTheme}/>
        {recomended}
        {categoriesSection}
        <section className="politics">Hello, no politics section yet</section>
      </div>
    </div>
  )
}


/*

export function App() {
  
  const productsIds = useMemo(gettingFakeIds,[])
  const categories = useMemo(()=> randomizer(category),[])
  // state: in standby
  //  const [changeTheme,setChangeTheme] = useState(String)
  //  const changePageTheme = useCallback(()=>{
  //    setChangeTheme(changeTheme)
  //  },[changeTheme])
  // useState and a function for pageTheme above - in veremos
  const [userId,setUserId] = useLocalStorage("userId",null)
  const [pageTheme,setPageTheme] = useLocalStorage("pageTheme","faddingEmerald")
  const [logStatus,setLogStatus] = useLocalStorage("logStatus",false)
  const [cart,setCart] = useLocalStorage("cart",{
    cartId: null,
    cartItems: []
  })
  const cartIds = useCart(userId)
  useEffect(()=>{

    // is there a logged user?
    let cookie = document.cookie
    const userToken = cookie?.split("=")[1]
    if(!userToken) return
    axios({
      method: "GET",
      url: "https://dummyjson.com/auth/me",
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    .then(res=>{
      const userData = res.data
      setUserId(userData["id"])
      setPageTheme("beMeMeBee")
      setLogStatus(true)
      setCart({
        cartId: userData["id"],
        cartItems: cartIds
      })
    })
    .catch(error=>{
      setUserId(null)
      setPageTheme("faddingEmerald")
      setLogStatus(false)
      setCart({
        cartId: null,
        cartItems: []
      })
      console.log(error)
    })
  },[])

  const globalStates ={
    "logStatus": logStatus,
    "userId": userId,
    "cart": cart,
    "pageTheme": pageTheme
  }
  const globalStateContext = createContext(globalStates)
  const categoriesSection = useMemo(()=>
    <CategoriesSection cartId={cartId} cartItems={cartItems} productsIds={productsIds} categories={categories} logStatus={logStatus} />,[cartItems, logStatus, productsIds, categories]
  )
  const recomended = useMemo(()=>
    <Recomended cartId={cartId} cartItems={cartItems} productsIds={productsIds} logStatus={logStatus} />,[cartItems,productsIds,logStatus]
  )
  return (
    <div id="app" className={pageTheme}>
      <Loader pageTheme={pageTheme}/>
      <div id="main">
        <NavBar logStatus={logStatus} pageTheme={pageTheme} userId={userId} />
        <OffersSection productsIds={productsIds} pageTheme={pageTheme}/>
        {recomended}
        {categoriesSection}
        <section className="politics">Hello, no politics section yet</section>
      </div>
    </div>
  )
}
*/