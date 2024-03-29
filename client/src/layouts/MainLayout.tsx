import { FC, useContext } from "react"
import Footer from "../components/footer/Footer"
import Nav from "../components/nav/Nav"
import { CoursesContext } from "../context/CoursesContext";

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    const { setIsAuthenticated, setUserName, setUserId, setIsCreateCourseModalOpen, setToken } = useContext(CoursesContext)

    const handleLogout =  () => {
        setIsCreateCourseModalOpen(false)
        setUserId(undefined)
        localStorage.setItem('token', '')
        localStorage.setItem('isUserAuthenticated', 'false')
        setToken('')
        setIsAuthenticated(false)
        setUserName('')
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