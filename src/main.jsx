// Library
import ReactDOM from 'react-dom/client'
// Context
import { UserContext } from './context/UserContext.jsx'
// Data Router Function, Primary Component
import { createHashRouter, RouterProvider } from 'react-router-dom'
// Jsx
import { App } from './App.jsx'
import { MainPage } from './components/MainPage.jsx'
// pages/subindexes
import { DisplayProduct } from "./components/DisplayProduct.jsx"
import { UserProfile } from "./components/UserProfile.jsx"
import { ShoppingCart } from "./components/ShoppingCart.jsx"
import { Loginregisterform } from './components/Loginregisterform.jsx'
import { LoginRegisterLayout } from './components/LoginRegisterLayout.jsx'

// Css
import './Root.css'

const hrouter = createHashRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        index: true,
        element: <MainPage />
      },
      {
        path:"displayproduct/:productId",
        element: <DisplayProduct />
      },
      {
        path:"userprofile/:userId",
        element: <UserProfile />
      },
      {
        path:"shoppingcart/:userId",
        element: <ShoppingCart />
      },
      {
        element: <LoginRegisterLayout />,
        children:[
          {
            path:"loginregisterform",
            element:<Loginregisterform />
          }
        ]        
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContext>
    <RouterProvider router={hrouter} />
  </UserContext>
)