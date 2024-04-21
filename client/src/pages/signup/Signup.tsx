import styles from '../login/Login.module.css'
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl"
import Eye from "../../components/eye/Eye"
import { toggleEye } from '../../helpers/toggleEye'
import { courses } from "../../assets/images/images"
import { signUpValidation, validateEmail, validatePassword } from '../validations/signUpValidation'
import SecondaryNav from '../../components/secondaryNav/SecondaryNav'
import { BoxMessage } from '../../components/boxMessage/BoxMessage'


export const Signup = () => {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ hasAnyError, setHasAnyError ] = useState<boolean>(false)
    const [ showPassword, setShowPassword ] = useState<boolean>(false)
    const [ wasAccountCreated, setWasAccountCreated ] = useState<boolean>(false)

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
            setWasAccountCreated(true)
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
      <SecondaryNav question='¿Ya estás registrado?' href='/iniciar-sesion' linkText='Inicia sesión' />
      <main className={ styles.main }>
        <form className={ styles['form-ctn'] } onSubmit={ handleSubmit }>
            <div>
                <h1>Regístrate</h1>
                <p>Crea una cuenta para añadir cursos y compartir feedback con la comunidad.</p> 
            </div>

            {
                wasAccountCreated && 
                    <BoxMessage message='¡Cuenta creada con éxito! Te hemos enviado un email para confirmación. No olvides revisar el spam.' />    
            }
            
            <div className={ styles['input-ctn'] }>
                <label htmlFor="name">Nombre:</label>
                <input onChange={ handleName } type="text" name="name" placeholder="Escribe tu nombre" value={ name } />
                { 
                    (hasAnyError && name.trim() === '') &&
                        <span className={ styles['error-message'] }>Por favor, ingresa tu nombre</span>  
                }
            </div>
            <div className={ styles['input-ctn'] }>
                <label htmlFor="email">Email:</label>
                <input onChange={ handleEmail } type="email" name="email" placeholder="Ingresa tu email" value={ email } />
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
                        placeholder="Ingresa tu contraseña" 
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
        <img src={ courses } alt="courses" width={500} />
      </main>
        
    </div>
  )
}
