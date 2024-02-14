import { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"
import { CoursesContext } from "../../context/CoursesContext"
import { profile } from "../../assets/images/images"
import styles from '../nav/Nav.module.css'
import AuthNav from "../authNav/AuthNav"



const Nav: FC<NavProps> = ({ handleLogout }) => {

    const { isAuthenticated, userName, setIsCreateCourseModalOpen } = useContext(CoursesContext)

    return(
        <nav className={ styles.nav }>
            <div className={ styles['nav-ctn'] }>
                <Link to='/'>CoursesLibra</Link>
                {
                    isAuthenticated
                        ? 
                            <div className={ styles['nav-ctn_navigation'] }>
                                <div className={ styles['secondary-nav-relative']}>
                                    <img src={ profile } alt="" width={35} />
                                    <div className={ styles['secondary-nav-ctn'] }>
                                        <AuthNav 
                                            userName={ userName } 
                                            handleLogout={ handleLogout } 
                                            handleNewCourse={ () => setIsCreateCourseModalOpen(true) } 
                                        />
                                    </div>
                                </div>
                            </div>
                        :   <div className={ styles['nav-ctn_navigation'] }>
                                <Link to='/iniciar-sesion'>Inicia sesión</Link>
                                <Link to='/registrarse'>Regístrate</Link>
                            </div>    
                }
            </div>
        </nav>
    )
}

export default Nav