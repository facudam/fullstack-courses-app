import { FC } from "react"
import { Link } from "react-router-dom"
import { NavProps } from "../../interfaces/models"


const Nav: FC<NavProps> = ({ isAuthenticate, handleLogout }) => {
    return(
        <nav>
            <div>IT COURSES</div>
            {
                isAuthenticate
                    ? <button onClick={ handleLogout }>Logout</button>
                    : <div>
                        <Link to='/login'>LogIn</Link>
                        <Link to='/signup'>SignUp</Link>
                        </div>    
            }
        </nav>
    )
}

export default Nav