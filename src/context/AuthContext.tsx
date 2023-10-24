import {createContext, useContext, useState} from "react";

interface AuthContextProps {
    isLoggIn : boolean,
    login : (accessToken : string,refreshToken : string) => void,
    logout : () => void
}
const initialContext : AuthContextProps = {
    isLoggIn : false,
    login : () => {},
    logout : () => {}
}
const AuthContext = createContext<AuthContextProps>(initialContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthProvider = ({children}:any) => {
    
    
    const [loggedIn, setLoggedIn] = useState(initialContext.isLoggIn);
    
    const login = (accessToken : string,refreshToken : string)  => {
        setLoggedIn(true);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }
    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
    
    const value = {
        isLoggIn : loggedIn,
        login,
        logout
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const {isLoggIn,login,logout} = useContext(AuthContext);
    return {isLoggIn,login,logout};
}
export default AuthProvider;