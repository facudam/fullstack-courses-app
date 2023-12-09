import { Link } from "react-router-dom"


export const Signup = () => {
  return (
    <div>
        <form>
            <div>
                <label htmlFor="name">name</label>
                <input type="text" name="name" placeholder="Enter name" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter Email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter password" />
            </div>
            <button>Log in</button>
            <p>Do you have an account already?</p>
            <Link to='/'>Login</Link>
        </form>
    </div>
  )
}
