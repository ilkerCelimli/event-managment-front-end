import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from "./context/AuthContext.tsx";
import {RouterProvider} from "react-router-dom";
import routes from './router/Router.tsx';
import {ChakraProvider} from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <ChakraProvider >
                <RouterProvider router={routes}></RouterProvider>
            </ChakraProvider>
        </AuthProvider>
    </React.StrictMode>,
)
