import axios, { AxiosResponse } from "axios";
import styles from './Login.module.css'
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import Eye from "../../components/eye/Eye";
import { toggleEye } from "../../helpers/toggleEye";


export const Login = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ isDataInvalid, setIsDataInvalid ] = useState<boolean>(false);
  const [ isDataEmpty, setIsDataEmpty ] = useState<boolean>(false)

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`${ apiBaseUrl }/api/validation`)
        .then(res => {
            if(res.data.valid) navigate('/') 
        })
        .catch(err => {
            console.log(err)
        })
})

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

  return (
    <div>
      <form action="" onSubmit={  handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            onChange={  handleEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
          />
          {
            (isDataEmpty && email.trim().length === 0) &&
              <span>Ingrese su email</span>
          }
        </div>
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            onChange={ handlePassword }
            type="password"
            name="password"
            placeholder="Enter password"
            value={ password }
          />
          {
            (isDataEmpty && password.trim().length === 0) &&
              <span>Ingrese su contraseña</span>
          }
          <button
              onClick={ (e) => toggleEye(e) } 
              className={ styles.button }>
              <Eye />
          </button>
        </div>
        <button type="submit">Inicia sesión</button>
        <p>¿Todavia no estás registrado?</p>
        <Link to="/signup">Regístrate</Link>
      </form>
      { isDataInvalid && <span>Usuario y/o contraseña inválidos</span> }
    </div>
  );
};
