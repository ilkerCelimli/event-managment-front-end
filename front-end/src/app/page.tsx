import {useAuth} from "@/store";

export default function Home() {
    const {isLoggedIn, login, logout} = useAuth()
    return (
        <>
            {console.log(isLoggedIn)}

            <button onClick = {() => login("adsdasdasd")}>Button</button>
        </>
    )
}
