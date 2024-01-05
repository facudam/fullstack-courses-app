import { FC } from "react"
import axios from 'axios'
import apiBaseUrl from "../services/api/endpoints/apiBaseUrl";
import Footer from "../components/footer/Footer"
import Nav from "../components/nav/Nav"

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    const handleLogout =  () => {
        axios.post(`${ apiBaseUrl }/logout`)
            // .then(() => setIsAuthenticate(false))
            .catch((error) => { console.log(error) })
    }
    return(
        <>
            <Nav isAuthenticate={true} handleLogout={handleLogout} />
            { children }
            <Footer />
        </>
    )
}

export default MainLayout