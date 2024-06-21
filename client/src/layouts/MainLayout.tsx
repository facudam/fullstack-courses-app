import { FC } from "react"
import Footer from "../components/footer/Footer"
import Nav from "../components/nav/Nav"


interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    return(
        <>
            <Nav />
            { children }
            <Footer />
        </>
    )
}

export default MainLayout