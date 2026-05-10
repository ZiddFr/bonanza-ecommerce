export function ProductCard({product}){
  const {id,title,price,discountPercentage,thumbnail,isHotDeal} = product;
  const finalPrice = (price - (price * discountPercentage / 100)).toFixed(2)
  return(
    <div className="productPreview" data-product={id} >
      <img src={thumbnail} alt={title} />
      <div className="productInformation">
        <p>{title}</p>
        <div style={{display:"flex",flexDirection:"row"}}>
          <p style={{color:"red",width:"fit-content",height:"fit-content",fontWeight:"bold"}}>{discountPercentage}%</p>
          <div style={{display:"flex",flexDirection:"row"}}>
            <p style={{color:"gray",textDecoration:"line-through",fontSize:"smaller"}}>${price}</p>
            <p style={{color:"green", fontSize:"x-large"}}>${finalPrice}</p>
          </div>
        </div>
        <CartButton productId={id} />
      </div>
    </div>
  )
}