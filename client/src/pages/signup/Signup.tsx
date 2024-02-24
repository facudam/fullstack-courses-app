import styles from './Signup.module.css'
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl"
import Eye from "../../components/eye/Eye"
import { toggleEye } from '../../helpers/toggleEye'
import { signUpValidation, validateEmail, validatePassword } from '../validations/signUpValidation'


export const Signup = () => {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ hasAnyError, setHasAnyError ] = useState<boolean>(false)
    const [ showPassword, setShowPassword ] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValid = signUpValidation({ name, email, password })

        if (!isValid) {
            setHasAnyError(true)
            return
        }
        setHasAnyError(false)

        axios.post(`${apiBaseUrl}/api/users`, { name, email, password })
        .then(res => {
            console.log(res)
            navigate('/iniciar-sesion')
        })
        .catch(err => {
            console.log(err)
            if (err.response && err.response.status === 409) {
                alert(`El email: ${email} ya se encuentra registrado`)
            } else {
                alert('No se pudo completar el registro: ' + err)
            }
        })
    }

    const togglePasswordVisivility = (e: React.MouseEvent<HTMLButtonElement>) => {
        toggleEye(e)
        setShowPassword(!showPassword)
    }

  return (
    <div>
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input onChange={ handleName } type="text" name="name" placeholder="Enter name" value={ name } />
                { 
                    (hasAnyError && name.trim() === '') &&
                        <span>Por favor, ingresa tu nombre</span>  
                }
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input onChange={ handleEmail } type="email" name="email" placeholder="Enter Email" value={ email } />
                {
                    (hasAnyError && !validateEmail(email)) &&
                        <span>Por favor, ingrese un email válido</span>
                }
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input 
                    onChange={ handlePassword } 
                    type={ showPassword ? "text" : "password" }
                    name="password" 
                    placeholder="Enter password" 
                    value={ password } 
                />
                {
                    (hasAnyError && !validatePassword(password)) &&
                        <span>La contraseña debe ser de entre 8 y 16 caracteres y debe poseer al menos una mayúscula y un número</span>
                }
                <button
                    onClick={ (e) => togglePasswordVisivility(e) } 
                    className={ styles.button }>
                   <Eye />
                </button>
            </div>
            <button type="submit">Registrarte</button>
            <p>¿Ya tienes una cuenta?</p>
            <Link to='/iniciar-sesion'>Iniciar sesión</Link>
        </form>
    </div>
  )
}
