import { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"
import { CoursesContext } from "../../context/CoursesContext"
import { profile, hat} from "../../assets/images/images"
import styles from '../nav/Nav.module.css'
import AuthNav from "../authNav/AuthNav"

const Nav: FC<NavProps> = ({ handleLogout }) => {

    const { isAuthenticated, userName, setIsCreateCourseModalOpen } = useContext(CoursesContext);

    const pressHamburgerBtn = () => {
        const buton = document.querySelector(`.${styles['hamburger-menu']}`)
        buton?.classList.toggle(`${styles['active-hamburger']}`)

        const menuNav = document.querySelector(`.${styles['nav-ctn_navigation2']}`);
        menuNav?.classList.toggle(`${styles['show-visibility']}`)
    }

    return(
        <nav className={ styles.nav }>
            <div className={ styles['nav-ctn'] }>
                <div className={ styles.logo }>
                    <img src={ hat } />
                    <span translate="no">CoursesLibra</span>
                </div>
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
                        :   <> 
                                <div
                                    onClick={ pressHamburgerBtn }
                                    className={ styles['hamburger-menu'] }>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className={ styles['nav-ctn_navigation2'] }>
                                    <Link to='/iniciar-sesion'>Iniciar sesión</Link>
                                    <Link to='/registrarse'>Regístrate</Link>
                                </div> 
                            </>   
                }
            </div>
        </nav>
    )
}

export default Nav