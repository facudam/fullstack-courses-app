import { FC, useContext } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"
import { CoursesContext } from "../../context/CoursesContext"


const Nav: FC<NavProps> = ({ handleLogout }) => {

    const { isAuthenticate, userName } = useContext(CoursesContext)

    return(
        <nav>
            <div>
                <div>IT COURSES</div>
                {
                    isAuthenticate
                        ? 
                            <div>
                                <p>Bienvenido { userName }</p>
                                <button onClick={ handleLogout }>Logout</button>
                            </div>
                        : <div>
                            <Link to='/login'>LogIn</Link>
                            <Link to='/signup'>SignUp</Link>
                            </div>    
                }
            </div>
        </nav>
    )
}

export default Nav