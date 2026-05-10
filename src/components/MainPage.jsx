// Context
import { UserStatus } from '../context/UserContext.jsx'
// Hook
import { useContext } from 'react'
// jsx
import { NavBar } from './NavBar.jsx'
import { CategoriesSection } from './CategoriesSection.jsx'
import { HotDealSection } from './HotDealSection.jsx'
import { Recommended } from './Recommended.jsx'
import { Loader } from './Loader.jsx'
// js

// css

export function MainPage() {
  const allUserContext = useContext(UserStatus)
  return (
    <div id="app" className={allUserContext.pageTheme}>
      <Loader />
      <div id="main">
        <NavBar />
        <HotDealSection />
        <Recommended />
        <CategoriesSection categoryLimit={2}/>
        <section className="politics">Hello, no politics section yet</section>
      </div>
    </div>
  )
}