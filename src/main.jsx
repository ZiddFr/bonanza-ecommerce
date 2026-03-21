import { createHashRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
// jsx
import { App } from './App.jsx'
import { UserContext } from './context/UserContext.jsx'
import { MainPage } from './components/MainPage.jsx'
// pages/subindexes
import { DisplayProduct } from "./components/DisplayProduct.jsx"
import { UserProfile } from "./components/UserProfile.jsx"
import { ShoppingCart } from "./components/ShoppingCart.jsx"
import { Loginregisterform } from './components/Loginregisterform.jsx'
import { LoginRegisterLayout } from './components/LoginRegisterLayout.jsx'

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
        path:"userprofile/:userToken",
        element: <UserProfile />
      },
      {
        path:"shoppingcart/:cartId",
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