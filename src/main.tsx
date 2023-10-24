import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from "./context/AuthContext.tsx";
import {RouterProvider} from "react-router-dom";
import routes from './router/Router.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

   <AuthProvider>
           <RouterProvider router={routes}></RouterProvider>
   </AuthProvider>
  </React.StrictMode>,
)
