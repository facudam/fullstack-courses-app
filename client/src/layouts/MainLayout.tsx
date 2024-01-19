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

    const { setIsAuthenticated, setUserName } = useContext(CoursesContext)

    const handleLogout =  () => {
        axios.post(`${ apiBaseUrl }/logout`)
            .then(() => {
                setIsAuthenticated(false)
                setUserName('')
            } )
            .catch((error) => { console.log(error) })
    }
    return(
        <>
            <Nav handleLogout={ handleLogout } />
            { children }
            <Footer />
        </>
    )
}

export default MainLayout