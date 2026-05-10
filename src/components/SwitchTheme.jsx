// Context
import { UserStatus } from '../context/UserContext.jsx'
// Hooks
import { useRef,useEffect,useState,useContext } from "react";
// React Icons
import { GiBee } from "react-icons/gi";
import { GiEmerald } from "react-icons/gi";
// Css
import './SwitchTheme.css'
export function SwitchTheme(){
  const menuRef = useRef(null)
  const {pageTheme,setPageTheme} = useContext(UserStatus)
  const [isOpen,setIsOpen] = useState(false)
  const iconStyles = {
    faddingEmerald : <GiEmerald />,
    beeMeMeBee: <GiBee />
  }
  const handleClickOutside = (e) =>{
    if(menuRef.current && !menuRef.current.contains(e.target)){
      setIsOpen(false)
    }
  }
  useEffect(()=>{
    document.addEventListener("click",handleClickOutside)
    return ()=>{
      document.removeEventListener("click",handleClickOutside)
    }
  },[])

  return(
    <>
      <button id={`switchThemeButton ${pageTheme}`} onClick={()=>{
        setIsOpen(prev => !prev)
      }}>
        {iconStyles[pageTheme]}
      </button>
      <div ref={menuRef} className="switchThemeMenu">
      {
        isOpen && 
        <>
          <div id="faddingEmeraldStyle" className="buttonTheme faddingEmerald" onClick={()=>{
            setPageTheme("faddingEmerald")
          }}>
            <p>Fadding Emerald </p><GiEmerald />
          </div>
          <div id="beeMeMeBee" className="buttonTheme beeMeMeBee" onClick={()=>{
            setPageTheme("beeMeMeBee")
          }}>
            <p>Be me, me Bee </p><GiBee />
          </div>
        </>
      }
      </div>
    </>
  )
}