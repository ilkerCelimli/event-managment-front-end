import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Login from "../component/Login.tsx";
import RegisterPage from "../component/Register.tsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login/>,
        
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }
])

export default routes;