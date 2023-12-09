import { ChangeEvent, useState } from 'react'
import  { Link } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert(email + '   ' + password)
    }

  return (
    <div>
        <form action='' onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    onChange={ handleEmail } 
                    type="email"
                    name='email'
                    placeholder="Enter Email"
                    value={ email }
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    onChange={ handlePassword } 
                    type="password" 
                    name='password'
                    placeholder="Enter password"
                    value={ password } 
                />
            </div>
            <button type='submit'>Log in</button>
            <p>Don't you have an account already?</p>
            <Link to='/signup'>Create an account</Link>
        </form>
    </div>
  )
}
