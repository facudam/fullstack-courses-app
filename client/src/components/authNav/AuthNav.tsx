import { FC } from "react"
import { AuthNavProps } from "../../interfaces/models"
import { logout, add } from "../../assets/images/images"
import styles from './AuthNav.module.css'


const AuthNav: FC<AuthNavProps> = ({ userName, handleLogout, handleNewCourse }) => {
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