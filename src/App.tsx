import {useAuth} from "./context/AuthContext.tsx";

function App() {
    const {isLoggIn} = useAuth();
  return (
    <>
        {isLoggIn}

    </>
  )
}

export default App
