// React Components
import { Link } from "react-router-dom";
// Components
import { CartButton } from "./CartButton";
// Css
import './ProductCard.css'
export function ProductCard({product}){
  const {id,title,price,discountPercentage,thumbnail,isHotDeal} = product;
  const finalPrice = (price - (price * discountPercentage / 100)).toFixed(2)
  return(
    <div className="productPreview" data-product={id} >
      <Link to={`/displayproduct/${id}`}>
        <img src={thumbnail} alt={title} />
      </Link>
      <div className="productInformation">
        <Link to={`/displayproduct/${id}`}>
          <p>{title}</p>
        </Link>
        <div>
          {isHotDeal ? (
            <>
              <div style={{display:"flex",flexDirection:"column"}}>
                <p className="bannerHotDeal">HOT DEAL</p>
                <div style={{display:"flex"}}>
                  <p style={{color:"gray",textDecoration:"line-through",fontSize:"smaller"}}>{`${price}`}</p>
                  <p style={{color:"red",width:"fit-content",height:"fit-content",fontWeight:"bold"}}>{`${discountPercentage}%`}</p>
                </div>
                <p style={{color:"green", fontSize:"x-large"}}>{`$${finalPrice}`}</p>
              </div>
            </>
          ) : (
            <>
              <p style={{color:"green",fontSize:"large"}}>{`${price}`}</p>
            </>
          )}
        </div>
        <CartButton productId={id} />
      </div>
    </div>
  )
}