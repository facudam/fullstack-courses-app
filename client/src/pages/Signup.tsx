import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'


export const Signup = () => {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const navigate = useNavigate()

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/users', { name, email, password } )
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate('/login')
        
    }

  return (
    <div>
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="name">name</label>
                <input onChange={ handleName } type="text" name="name" placeholder="Enter name" value={ name } />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input onChange={ handleEmail } type="email" name="email" placeholder="Enter Email" value={ email } />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={ handlePassword } type="password" name="password" placeholder="Enter password" value={ password } />
            </div>
            <button type="submit">Signup</button>
            <p>Do you have an account already?</p>
            <Link to='/'>Login</Link>
        </form>
    </div>
  )
}
