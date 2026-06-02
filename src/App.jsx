// Context
import { UserStatus } from './context/UserContext.jsx'
// React Hooks
import { useContext } from 'react'
// React Component
import { Outlet } from 'react-router-dom'
// Jsx
import { Loader } from './components/Loader.jsx'
import { ScrollToTop } from './components/ScrollToTop.jsx'
// Js

// Css
import './App.css'
import './Root.css'
export function App() {
  const allUserStatus = useContext(UserStatus)
  return (
    <div id="app" className={allUserStatus.pageTheme}>
      <Loader />
      <div id="main">
        <ScrollToTop />
        <Outlet/>
      </div>
    </div>
  )
}