// Hooks
import { useContext,useState,useEffect } from 'react'
// component
import { Link } from 'react-router-dom'
// jsx
import { CartButton } from './CartButton.jsx'
import { getOfferProducts } from '../utils/getOfferProducts.js'
import { UserStatus } from '../context/UserContext.jsx'
// js

// css
import './OffersSection.css'

// icons
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"

export const OffersSection = () => {
  const allUserContext = useContext(UserStatus)
  const [index,setIndex] = useState(0)
  const [dataProducts,setDataProducts] = useState([])
  useEffect(()=>{
    (async function gettingData(){
      let allDataProducts = await getOfferProducts()
      setDataProducts(allDataProducts)
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
    return(
      <>
        <section 
          id="offers__section__wrapper" 
          className={allUserContext.pageTheme}>
          <div 
            className="preview_offers">
            <button 
              id="previousOffer" 
              onClick={handlePrevious}>
              <GrPrevious />
            </button>
            <div 
              className="forEachOffer offerDivs">
              <Link
                to={`/displayproduct/${dataProducts[index].id}`}
              >
                <img 
                  className="productOffer-img" 
                  src={dataProducts[index].images[0]} 
                  alt={dataProducts[index].title} 
                />
              </Link>
              <div 
                className="previewText">
                <Link
                  className="preview_offer-title" 
                  title={dataProducts[index].title} 
                  to={`/displayproduct/${dataProducts[index].id}`}
                >
                  <h3>
                    {dataProducts[index].title}
                  </h3>
                </Link>
                <p 
                  className="descriptionOffer">
                  {dataProducts[index].description}
                  </p>
                <h3 
                  className="OfferPrice">
                  {(dataProducts[index].price * (1 - 0.99)).toFixed(2)}
                  </h3>
                <h3 
                  className="originalPrice">
                  {dataProducts[index].price}
                </h3>
                <CartButton 
                  whatCartType={"productCartType"} 
                  productId={dataProducts[index].id} />
              </div>
            </div>
            <button 
              id="nextOffer" 
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