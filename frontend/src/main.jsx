import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Asset from './pages/Assets/Asset'
import Error from './components/error/Error'
import Bills from './pages/Bills/Bills'
import Spends from './pages/Spends/Spends'
import AddBill from './pages/AddBill/AddBill'
import AddSpend from './pages/AddSpend/AddSpend'
import NotFound from './pages/NotFound'

import { loader as spendLoader } from './pages/AddSpend/loader'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Home/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement : <NotFound/>,
    children : [
      {
        path: "/",
        element: <Error><Dashboard/></Error>,    
      },
      {
        path: "/asset",
        element: <Error><Asset /></Error>,    
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/spends",
        element: <Spends />,
      },
      {
        path: "/addbill",
        element: <AddBill />,
      },
      {
        path: "/addspend",
        element: <AddSpend />
      },
      {
        path: "/addspend/:id",
        element: <AddSpend />,
        loader : spendLoader
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)