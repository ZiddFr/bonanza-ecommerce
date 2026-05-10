// Services
import { search } from "../services/search.js"
// React hooks
import { useEffect,useState,useRef } from "react"
// React-router-dom hooks
import { useNavigate } from "react-router-dom"
// Components
import { SearchResults } from "./SearchResults.jsx"
import { InputForm } from "./InputForm.jsx"
// Css
import "./SearchBar.css"
export const SearchBar = () => {
  const searchBarRef = useRef(null)
  const navigate = useNavigate()
  const [searchInput,setSearchInput] = useState("")
  const [results,setResults] = useState([])
  const [isFocused,setIsFocused] = useState(false)
  const handleNavigate = () => {
    navigate(`/catalog?q=${searchInput}`)
  }
  const handleChange = (value) => {
    setSearchInput(value)
    if(!value){
      setResults({})
      return
    }
    (async function(){
      try {
        const searchResponse = await search(value)
        setResults(searchResponse)
      } catch (error) {
        console.error("Error: ", error)
        //Tal vez agregar un pop-up mostrando error
        // de búsqueda o no hay productos con ese input
        setResults({})
      }
    })()
  }
  const handleClickOutside = (e) =>{
    if(searchBarRef.current && !searchBarRef.current.contains(e.target)){
      setIsFocused(false)
    }
  }
  useEffect(()=>{
      document.addEventListener("click",handleClickOutside)
    return () =>{
      document.removeEventListener("click",handleClickOutside)
    }
  },[])
  return (
    <>
    <form onSubmit={(e)=>{
      e.preventDefault()
      handleNavigate()}} id="searchBar_wrapper" >
      <div ref={searchBarRef} className="searchBar_wrapper">
      <InputForm inputType={"search"} name={"searchBar"} inputId={"searchBar"} textPlaceholder={"SearchBar..."} onChange={e=>{handleChange(e.target.value)}} onClick={()=>{
        setIsFocused(prev => !prev)
      }} />
      </div>
      <div id="searchResults">
        {isFocused &&
          results.map((product,index)=>{
            return(
              <SearchResults key={index} product={product} />
            )
          })
        }
      </div>
    </form>
    </>
  )
}