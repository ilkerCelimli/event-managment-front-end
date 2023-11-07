import {Button, Link} from "@chakra-ui/react";
import {useAuth} from "./context/AuthContext.tsx";

function App() {

    const {logout} = useAuth()

  return (
    <>
        Index

        <Link href={"/login"}>Login</Link>

        <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default App
