// React Icons
import { TbHomeUp } from "react-icons/tb"
// Css
import './ScrollUpButton.css'
export function ScrollUpButton(){
  return(
    <>
      <button className="scrollUpButton" onClick={()=>{window.scrollTo(0,0)}}><TbHomeUp/></button>
    </>
  )
}