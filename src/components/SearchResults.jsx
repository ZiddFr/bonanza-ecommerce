// React component
import { Link } from "react-router-dom"
export function SearchResults({product, onClick}){
  return(
    <div className="NavLinkWrapper result">
      <Link to={`/displayproduct/${product.id}`}>
        <div className="showingProduct" onClick={onClick}>
          <p className="titleProduct">
            {product.title}
          </p>
          <div className="categoryContainer">
            <p className="pCategory">
              Category: <br></br>
            </p>
            <p className="categoryProduct">
              {product.category}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}