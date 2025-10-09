import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
//css stuff
import "./SearchBar.css"
export const SearchBar = () => {
  const [input,setInput] = useState("")
  const [results,setResults] = useState([])
  const [isFocused,setIsFocused] = useState()
  const gettingProducts = (value) => {
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data=>{
      const searchResults = data["products"].filter((product)=>{
        return value && product && product.title && product.title.toLowerCase().includes(value)
      })
      setResults(searchResults)
    })
    .catch(error=>{
      // I'll handle this another time, all work like it's the ideal case
      console.log("Error: " + error)
    })
  }
  const handleChange = (value) => {
    setInput(value)
    gettingProducts(value)
  }

  useEffect(()=>{
    const searchBar = document.getElementById("searchBar")
    searchBar.addEventListener("focus",()=>{
      setIsFocused(true) 
    })
    searchBar.addEventListener("blur",()=>{
      setIsFocused(false)
    })
    const searchResults = document.getElementById("searchResults")
    searchResults.addEventListener("mousedown",(e)=>{
      e.preventDefault()
      searchBar.focus()
    })
  },[])

  const resetSearchBar = () =>{
    setInput("")
    setResults([])
  }
  return (
    <>
      <div id="searchBar_wrapper">
        <input value={input}
        onChange={e=>{handleChange(e.target.value)}}
        type="search" name="searchBar" id="searchBar" />
        <div id="searchResults">
          {
            results.map((product,id)=>{
              return(
                <div className="NavLinkWrapper" style={{display: isFocused ? "block" : "none"}} key={id}>
                  <Link
                    reloadDocument
                    to={{
                      pathname: `/displayproduct/${product.id}`
                    }}
                    onClick={resetSearchBar}
                  >
                    <div className="showingProduct">
                      <p className="titleProduct" style={{fontWeight:"bold"}}>{product.title}</p>
                      <div className="categoryContainer" style={{display:"flex"}}>
                        <p className="pCategory" style={{fontSize:"smaller"}}>Category: <br></br></p> 
                        <p className="categoryProduct" style={{fontSize:"large"}}>
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}