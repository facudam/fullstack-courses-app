import styles from '../login/Login.module.css'
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl"
import Eye from "../../components/eye/Eye"
import { toggleEye } from '../../helpers/toggleEye'
import { hat } from "../../assets/images/images"
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

    const togglePasswordVisivility = () => {
        toggleEye()
        setShowPassword(!showPassword)
    }

  return (
    <div className={ styles['main-ctn'] }>
        <nav className={ styles.nav }>
        <div className={ styles.logo }>
            <img src={ hat } />
            <span translate="no">CoursesLibra</span>
            <span>Beta</span>
        </div>
        <div className={ styles['nav-link-ctn'] }>
            <span>¿Ya estás registrado?</span>
            <Link to="/iniciar-sesion">Inicia sesión</Link>
        </div>
      </nav>
      <main className={ styles.main }>
        <form className={ styles['form-ctn'] } onSubmit={ handleSubmit }>
            <h1>Crea una cuenta</h1>
            <div className={ styles['input-ctn'] }>
                <label htmlFor="name">Nombre:</label>
                <input onChange={ handleName } type="text" name="name" placeholder="Enter name" value={ name } />
                { 
                    (hasAnyError && name.trim() === '') &&
                        <span className={ styles['error-message'] }>Por favor, ingresa tu nombre</span>  
                }
            </div>
            <div className={ styles['input-ctn'] }>
                <label htmlFor="email">Email:</label>
                <input onChange={ handleEmail } type="email" name="email" placeholder="Enter Email" value={ email } />
                {
                    (hasAnyError && !validateEmail(email)) &&
                        <span className={ styles['error-message'] }>Por favor, ingrese un email válido</span>
                }
            </div>
            <div className={ styles['input-ctn'] }>
                <label htmlFor="password">Contraseña</label>
                <div className={ styles['input-eye-ctn'] }>
                    <input 
                        onChange={ handlePassword } 
                        type={ showPassword ? "text" : "password" }
                        name="password" 
                        placeholder="Enter password" 
                        value={ password } 
                    />
                    
                    <div className={ styles['eye-btn-ctn'] }>
                        <input type="checkbox"
                            onChange={ togglePasswordVisivility } 
                            className={ styles['check-box'] }>
                        </input>
                        <Eye />
                    </div>
                </div>
                {
                    (hasAnyError && !validatePassword(password)) &&
                        <span className={ styles['error-message'] }>La contraseña debe ser de entre 8 y 16 caracteres y debe poseer al menos una mayúscula y un número</span>
                }
            </div>
            <button className={ styles.button } type="submit">Registrarte</button>
            <Link className={ styles.link } to="/">O continua sin registrarte</Link>
        </form>
      </main>
        
    </div>
  )
}
