import axios, { AxiosResponse } from "axios";
import styles from './Login.module.css'
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import Eye from "../../components/eye/Eye";
import { toggleEye } from "../../helpers/toggleEye";
import { courses } from "../../assets/images/images"
import SecondaryNav from "../../components/secondaryNav/SecondaryNav";


export const Login = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ isDataInvalid, setIsDataInvalid ] = useState<boolean>(false);
  const [ isDataEmpty, setIsDataEmpty ] = useState<boolean>(false)
  const [ showPassword, setShowPassword ] = useState<boolean>(false)

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasEmptyData = 
      email.trim().length === 0 ||
      password.trim().length === 0;

    if (hasEmptyData) {
      setIsDataEmpty(true)
      return
    }

    setIsDataEmpty(false)

    axios.post(`${ apiBaseUrl }/api/login`, { email, password }, { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data.login) {
          setIsDataInvalid(false);
          navigate('/')
        }
      })
      .catch((err) => {
        setIsDataInvalid(true);
        console.log("Hubo un error: " + err);
      });
  };

  const togglePasswordVisivility = () => {
      toggleEye()
      setShowPassword(!showPassword)
  }

  return (
    <div className={ styles['main-ctn'] }>
      <SecondaryNav question="¿Todavia no estás registrado?" href="/registrarse" linkText="Regístrate" />
      <main className={ styles.main }>
        <form className={ styles['form-ctn'] } onSubmit={ handleSubmit }>
          <div>
            <h1>Inicia sesión</h1>
            <p>Loguéate para acceder a tu cuenta y continuar explorando en la plataforma.</p>
          </div>
          
          <div className={ styles['input-ctn'] }>
            <label htmlFor="email">Email: </label>
            <input
              onChange={ handleEmail }
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={email}
            />
            {
              (isDataEmpty && email.trim().length === 0) &&
                <span className={ styles['error-message'] }>Por favor, ingrese su email</span>
            }
          </div>
          <div className={ styles['input-ctn'] }>
            <label htmlFor="password">Contraseña: </label>
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
              (isDataEmpty && password.trim().length === 0) &&
                <span className={ styles['error-message'] }>Por favor, ingrese su contraseña</span>
            }
          </div>
          <button className={ styles.button } type="submit">Iniciar sesión</button>
          <Link className={ styles.link } to="/">O continua sin iniciar sesión</Link>
          { isDataInvalid && <span style={{ "textAlign": "center" }}><strong>Usuario y/o contraseña inválidos</strong></span> }
        </form>
        <img src={ courses } alt="courses" width={500} />
      </main>
      
    </div>
  );
};
