import { Outlet } from "react-router-dom"
import Header from "./Header"

const HeartLayout = () => {
    return(
        <>
            <Header/>
            <main className="bg-accent">
                <Outlet/>
            </main>
        </>
    )
}

export default HeartLayout