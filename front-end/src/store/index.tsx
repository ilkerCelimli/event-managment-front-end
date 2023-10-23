import {createContext, useContext, useState} from "react";
import useCookie from "@/util/CookieUtil";

interface AuthModel {
    isLoggedIn: boolean
    login: (token: string | undefined) => void
    logout: () => void
}


const AuthContext = createContext<AuthModel>({
    isLoggedIn: false, login: (token?: string) => {
    }, logout: () => {
    }
})

const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const {setCookie, deleteCookie} = useCookie();

    const login = (accessToken?: string, refreshToken?: string): void => {
        if (accessToken) {
            setCookie("accessToken", accessToken, true)
            setIsLoggedIn(prevState => {
                if (!prevState) return !prevState
                return prevState
            })
        }
        if (refreshToken) setCookie("refreshToken", refreshToken, true)
    }

    const logout = (): void => {
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
        setIsLoggedIn(prevState => !prevState)
    }

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const value = {isLoggedIn, login, logout}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContextProvider