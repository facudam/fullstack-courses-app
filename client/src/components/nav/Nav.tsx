import { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"
import { CoursesContext } from "../../context/CoursesContext"
import { profile } from "../../images/images"
import styles from '../nav/Nav.module.css'
import AuthNav from "../authNav/AuthNav"



const Nav: FC<NavProps> = ({ handleLogout }) => {

    const { isAuthenticated, userName } = useContext(CoursesContext)
    console.log(handleLogout)

    return(
        <nav className={ styles.nav }>
            <div className={ styles['nav-ctn'] }>
                <span>CoursesLibra</span>
                {
                    isAuthenticated
                        ? 
                            <div className={ styles['nav-ctn_navigation'] }>
                                <div className={ styles['secondary-nav-relative']}>
                                    <img src={ profile } alt="" width={35} />
                                    <div className={ styles['secondary-nav-ctn'] }>
                                        <AuthNav userName={ userName } handleLogout={ handleLogout } />
                                    </div>
                                </div>
                            </div>
                        :   <div className={ styles['nav-ctn_navigation'] }>
                                <Link to='/login'>LogIn</Link>
                                <Link to='/signup'>SignUp</Link>
                            </div>    
                }
            </div>
        </nav>
    )
}

export default Nav