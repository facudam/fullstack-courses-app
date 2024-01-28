import { FC } from "react"
import { AuthNavProps } from "../../interfaces/models"
import { Link } from "react-router-dom"
import styles from './AuthNav.module.css'


const AuthNav: FC<AuthNavProps> = ({ userName, handleLogout, handleNewCourse }) => {
    return(
        <nav className={ styles.nav }>
            <span>{ userName }</span>
            <ul>
                <li><button onClick={ handleNewCourse }>Añadir curso</button></li>
                <li><Link to='/configuracion'>Configuración</Link></li>
                <li><button onClick={ handleLogout }>Cerrar sesión</button></li>
            </ul>
        </nav>
    )
}

export default AuthNav