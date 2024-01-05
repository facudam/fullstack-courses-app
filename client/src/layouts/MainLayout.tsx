import { FC, useContext } from "react"
import axios from 'axios'
import apiBaseUrl from "../services/api/endpoints/apiBaseUrl";
import Footer from "../components/footer/Footer"
import Nav from "../components/nav/Nav"
import { CoursesContext } from "../context/CoursesContext";

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    const { setIsAuthenticate, isAuthenticate } = useContext(CoursesContext)

    const handleLogout =  () => {
        axios.post(`${ apiBaseUrl }/logout`)
            .then(() => setIsAuthenticate(false))
            .catch((error) => { console.log(error) })
    }
    return(
        <>
            <Nav isAuthenticate={ isAuthenticate } handleLogout={ handleLogout } />
            { children }
            <Footer />
        </>
    )
}

export default MainLayout