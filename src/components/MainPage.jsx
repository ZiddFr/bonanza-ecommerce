// Context
import { UserStatus } from '../context/UserContext.jsx'
// Hook
import { useContext } from 'react'
// Jsx
import { NavBar } from './NavBar.jsx'
import { CategoriesSection } from './CategoriesSection.jsx'
import { HotDealSection } from './HotDealSection.jsx'
import { Recommended } from './Recommended.jsx'
import { Loader } from './Loader.jsx'
import { ScrollUpButton } from './ScrollUpButton.jsx'
// Js

// Css
import './HotDealSection.css'
import "./CategoriesSection.css"
import '../Root.css'
// Image
import bananLoader from '../imagenes/bananLoader.png'
export function MainPage() {
  const allUserStatus = useContext(UserStatus)
  return (
    <div id="app" className={`${allUserStatus.pageTheme} pageTransition`}>
      <Loader />
      <div id="mainPage">
        <NavBar />
        <HotDealSection />
        <Recommended />
        <CategoriesSection categoryLimit={2}/>
        <section className="politics">
          <h2 style={{display:"flex",justifyContent:"center",alignContent:"center"}}>Hello, no politics section yet. You take banana... here...
            <img src={bananLoader} alt="Logo ecommercer" style={{width:"50px",height:"50px"}}/>
          </h2>
        </section>
        <ScrollUpButton />
      </div>
    </div>
  )
}