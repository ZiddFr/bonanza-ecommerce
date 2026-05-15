// React-router-dom
import { useNavigate } from 'react-router-dom'
// jpg, png, etc.
import logo from '../imagenes/banan.png'
// css
import './Logo.css'
export const Logo = () => {
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate("/")
  }
  return(
    <>
      <div className="contenedor_logo">
        <div id="logo" onClick={()=>{handleNavigate()}}>
          <img id="img_logo" src={logo} alt="Logo ecommerce" />
        </div> 
        <span className="pageTitle rainbow">Bonanzaaa!!</span>
      </div>
    </>
  )
}