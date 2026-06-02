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
        <img className="productImg" src={thumbnail} alt={title} />
      </Link>
      <div className="productInformation">
        <Link to={`/displayproduct/${id}`}>
          <p className="productTitle">{title}</p>
        </Link>
        <div>
          {isHotDeal ? (
            <>
              <div className="priceContainer">
                <p className="bannerHotDeal">HOT DEAL</p>
                <div className="discountRow">
                  <p className="productPrice" style={{textDecoration:"line-through"}}>{`$${price}`}</p>
                  <p className="productDiscount">{`${discountPercentage}%`}</p>
                </div>
                <p className="productFinalPrice">{`$${finalPrice}`}</p>
              </div>
            </>
          ) : (
            <>
              <p className="productNormalPrice">{`$${price}`}</p>
            </>
          )}
        </div>
      </div>
        <CartButton productId={id} />
    </div>
  )
}