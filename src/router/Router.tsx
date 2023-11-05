import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Login from "../component/Login.tsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login/>,
        
    }
])

export default routes;