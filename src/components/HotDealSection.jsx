// Context
import { UserStatus } from '../context/UserContext.jsx'
// Hooks
import { useContext,useState,useEffect } from 'react'
// React Component
import { Link } from 'react-router-dom'
// Jsx
import { CartButton } from './CartButton.jsx'
// Utils
import { hotDealsProducts } from '../utils/hotDealsProducts.js'
// Js
// Css
import './HotDealsSection.css'
// icons
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"

export const HotDealSection = () => {
  const allUserContext = useContext(UserStatus)
  const [index,setIndex] = useState(0)
  const [dataProducts,setDataProducts] = useState([])
  useEffect(()=>{
    (async function gettingData(){
      const hotDeals = await hotDealsProducts() // [...]
      setDataProducts(hotDeals)
      setIndex(0)
    })()
  },[])
  const handlePrevious = () => {
    if(dataProducts.length === 0) return;
    setIndex((prev)=>(prev - 1 + dataProducts.length) % dataProducts.length)
  }
  const handleNext = () => {
    if(dataProducts.length === 0) return;
    setIndex((prev)=>(prev+1) % dataProducts.length)
  }
  if(dataProducts.length == 0){
    return(
      <>
        <h1>Cargando...</h1>
      </>
    )
  } else {
    const finalPrice = (dataProducts[index].price - (dataProducts[index].price * dataProducts[index].discountPercentage / 100)).toFixed(2)
    return(
      <>
        <section 
          id="hotDeals__section__wrapper" 
          className={allUserContext.pageTheme}>
          <div 
            className="preview_hotDeals">
            <button 
              id="previousHotDeal"
              onClick={handlePrevious}>
              <GrPrevious />
            </button>
            <div 
              className="forEachHotDeal hotDealDivs">
              <Link
                to={`/displayproduct/${dataProducts[index].id}`}
              >
                <img 
                  className="productHotDeal-img"
                  src={dataProducts[index].images[0]} 
                  alt={dataProducts[index].title} 
                />
              </Link>
              <div 
                className="previewText">
                <Link
                  className="preview_hotDeal-title" 
                  title={dataProducts[index].title} 
                  to={`/displayproduct/${dataProducts[index].id}`}
                >
                  <h3>
                    {dataProducts[index].title}
                  </h3>
                </Link>
                <p 
                  className="descriptionHotDeal">
                  {dataProducts[index].description}
                  </p>
                <h3 
                  className="HotDealPrice">
                  {finalPrice}
                  </h3>
                <h3 
                  className="originalPrice">
                  {dataProducts[index].price}
                </h3>
                <CartButton productId={dataProducts[index].id} />
              </div>
            </div>
            <button 
              id="nextHotDeal" 
              onClick={handleNext}>
              <GrNext />
            </button>
          </div>
        </section>
      </>
    )
  }
}
// #mydiv-$*3     ->creará 3 divs: <div id="mydiv-1"></div><div id="mydiv-2"></div><div id="mydiv-3"></div>
//paraiso capital, , The mouts - por que no me dijiste nada, reina de los lagartos - aquel lugar, 