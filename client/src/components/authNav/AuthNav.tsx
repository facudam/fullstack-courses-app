import { FC, useContext } from "react"
import { AuthNavProps } from "../../interfaces/models"
import { logout, add } from "../../assets/images/images"
import styles from './AuthNav.module.css'
import axios from "axios"
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl"
import { CoursesContext } from "../../context/CoursesContext"


const AuthNav: FC<AuthNavProps> = ({ userName, handleNewCourse }) => {

    const { setIsAuthenticated, setUserName, setUserId, setIsCreateCourseModalOpen } = useContext(CoursesContext)

    const handleLogout = async() => {
        await axios.post(`${apiBaseUrl}/api/logout`,{}, { withCredentials: true })
        setIsCreateCourseModalOpen(false)
        setUserId(undefined)
        setIsAuthenticated(false)
        setUserName('')
    }

    return(
        <nav className={ styles.nav }>
            <span>Bienvenido { userName }</span>
            <ul>
                <li><button onClick={ handleNewCourse }>
                    <img src={ add } alt="añadir" />
                    Añadir curso
                </button></li>
                <li><button onClick={ handleLogout }>
                    <img src={ logout } alt="cerrar sesion" />
                    Cerrar sesión
                </button></li>
            </ul>
        </nav>
    )
}

export default AuthNav