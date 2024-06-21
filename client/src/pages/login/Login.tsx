import axios, { AxiosError, AxiosResponse } from "axios";
import styles from './Login.module.css'
import { ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import Eye from "../../components/eye/Eye";
import { toggleEye } from "../../helpers/toggleEye";
import { courses } from "../../assets/images/images"
import SecondaryNav from "../../components/secondaryNav/SecondaryNav";
import { CoursesContext } from "../../context/CoursesContext";
import { showRelatedStatusErrorMessage } from "../../helpers/showRelatedStatusErrorMessage";

export const Login = () => {

  const { setToken } = useContext(CoursesContext);

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ isDataInvalid, setIsDataInvalid ] = useState<boolean>(false);
  const [ isUserAccountConfirmed, setIsUserAccountConfirmed ] = useState<boolean>(true)
  const [ isDataEmpty, setIsDataEmpty ] = useState<boolean>(false)
  const [ showPassword, setShowPassword ] = useState<boolean>(false)

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate()

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

    axios.post(`${ apiBaseUrl }/api/login`, { 
      email, password }, {
        withCredentials: true // Incluímos las credenciales: la cookie con el token
      })
      .then((res: AxiosResponse) => {
        if (res.data.login) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          setIsDataInvalid(false);
          navigate('/')
        }
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          showRelatedStatusErrorMessage(err.response.status, setIsDataInvalid, setIsUserAccountConfirmed)
        }
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
              placeholder="Pruébalo con: usuario@prueba.com"
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
              placeholder="Ingresa: User12345678"
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
          { !isUserAccountConfirmed && <span style={{ "textAlign": "center", "color": "rgb(230,0,0)" }}>Su cuenta aún no ha sido confirmada, por favor ingrese a su correo y confírmela.</span> }
        </form>
        <img src={ courses } alt="courses" width={500} />
      </main>
      
    </div>
  );
};
