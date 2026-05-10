// Context
import { UserStatus } from './context/UserContext.jsx'
// Hooks
import { useContext } from 'react'
// React Component
import { Outlet } from 'react-router-dom'
// Jsx
import { Loader } from './components/Loader.jsx'
// Js

// Css
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