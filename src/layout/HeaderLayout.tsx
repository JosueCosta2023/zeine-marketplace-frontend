import { Outlet } from "react-router-dom"
import Header from "./Header"

const HeartLayout = () => {
    return(
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default HeartLayout