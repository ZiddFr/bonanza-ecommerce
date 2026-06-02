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
  const switchRef = useRef(null)
  const {pageTheme,setPageTheme} = useContext(UserStatus)
  const [isOpen,setIsOpen] = useState(false)
  const iconStyles = {
    faddingEmerald : <GiEmerald />,
    beeMeMeBee: <GiBee />
  }
  const handleClickOutside = (e) =>{
    if(menuRef.current && !menuRef.current.contains(e.target) && switchRef.current && !switchRef.current.contains(e.target)){
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
      <div className="switchThemeContainer">
        <button ref={switchRef} id="switchThemeButton" className={`switchThemeButton ${pageTheme}`} onClick={()=>{
          setIsOpen(prev => !prev)
        }}>
          {iconStyles[pageTheme]}
        </button>
        <div ref={menuRef} className="switchThemeMenu">
        {
          isOpen && 
          <div className='themes'>
            <div id="faddingEmeraldTheme" className="buttonTheme faddingEmerald" onClick={()=>{
              setPageTheme("faddingEmerald")
              setIsOpen(false)
            }}>
              <span className="iconEmerald"><GiEmerald /></span>
              <p>Fadding Emerald</p>
            </div>
            <div id="beeMeMeBeeTheme" className="buttonTheme beeMeMeBee" onClick={()=>{
              setPageTheme("beeMeMeBee")
              setIsOpen(false)
            }}>
              <span className="iconBee"><GiBee /></span>
              <p>Be me, me Bee</p>
            </div>
          </div>
        }
        </div>
      </div>
    </>
  )
}