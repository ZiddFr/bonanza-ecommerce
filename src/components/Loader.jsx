// Context
import { UserStatus } from '../context/UserContext.jsx'
// Hook
import { useContext } from 'react'
// react icons
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"
// Imagen
import bananLoader from '../imagenes/bananLoader.png'

export function Loader(){
  const allUserStatus = useContext(UserStatus)
  return(
    <>
      <div className={`loader ${allUserStatus.pageTheme}`}>
        <div className="contenedor">
          <div id="contPrevious">
            <p id="grPrevious"><GrPrevious /></p>
          </div>  
          <div className="bananLoader">
            <img src={bananLoader} alt="Logo ecommercer" />
          </div>
          <div id="contNext">
            <p id="grNext"><GrNext /></p>
          </div>  
        </div>
      </div>
    </>
  )
}