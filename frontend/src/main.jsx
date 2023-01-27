import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'
import Asset from './pages/Assets/Asset'
import Error from './components/error/Error'
import Bills from './pages/Bills/Bills'
import AddBill from './pages/AddBill/AddBill'
import NotFound from './pages/NotFound'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement : <NotFound/>,
    children : [
      {
        path: "/asset",
        element: <Error><Asset /></Error>,    
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/addbill",
        element: <AddBill />,
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)