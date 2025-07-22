import { Outlet } from "react-router-dom"
import Header from "./Header"

const HeartLayout = () => {
    return(
        <>
            <Header/>
            <main className="bg-accent" style={{width:"1200px", margin: "0 auto"}}>
                <Outlet/>
            </main>
        </>
    )
}

export default HeartLayout