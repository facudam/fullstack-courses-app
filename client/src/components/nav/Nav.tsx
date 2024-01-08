import { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"
import { CoursesContext } from "../../context/CoursesContext"
import styles from '../nav/Nav.module.css'


const Nav: FC<NavProps> = ({ handleLogout }) => {

    const { isAuthenticate, userName } = useContext(CoursesContext)

    return(
        <nav className={ styles.nav }>
            <div className={ styles['nav-ctn'] }>
                <div>CoursesLibra</div>
                {
                    isAuthenticate
                        ? 
                            <div className={ styles['nav-ctn_navigation'] }>
                                <p>Bienvenido { userName }</p>
                                <button onClick={ handleLogout }>Logout</button>
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