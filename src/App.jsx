import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
// components
import { Loader } from './components/Loader.jsx'
// jsx
import { UserStatus } from './context/UserContext.jsx'
// js
// css
import './Root.css'
import './App.css'

export function App() {
  const allUserContext = useContext(UserStatus)
  return (
    <div id="app" className={allUserContext.pageTheme}>
      <Loader />
      <div id="main">
        <Outlet/>
      </div>
    </div>
  )
}